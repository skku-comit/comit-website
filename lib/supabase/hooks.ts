'use client'

import { useCallback, useEffect, useState } from 'react'

import { supabase } from '@/lib/supabase/client'

interface SupabaseFile {
  file: File
  supabaseFileData: { id: string; path: string; fullPath: string; url: string }
  commit: () => void
  delete: () => Promise<void>
}
const MINUTES_10 = 600000
export interface UseSupabaseFileOptions {
  bucketName?: string
  pathPrefix?: string
  autoDeleteDelay?: number
}

const sanitizeFileName = (fileName: string): string => {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, '_')
}

/**
 * Supabase Storage에 파일을 업로드하고, 업로드된 파일의 정보를 반환하는 Hook   
 * 만약 `commit`이 호출되지 않을 경우 `autoDeleteDelay`(기본 10분) 시간이 지나면   
 * 서버에 정상 반영이 되지 않아 사용되지 않는 파일 저장을 방지하기 위해 파일이 삭제됩니다.   
 * 서버에 정상적으로 반영되었을 때 `commit`을 호출하여 파일을 영구적으로 저장해주세요.
 * @param bucketName Supabase Storage의 Bucket 이름 (기본값: process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME)
 * @param pathPrefix 파일이 저장될 경로
 * @param autoDeleteDelay `commit`이 호출되지 않을 경우 파일이 삭제되는 시간 (ms) (기본값: 600000)
 *
 * @example
   ```tsx
   const fileHandler = useSupabaseFile()
   const onSubmit = async (data: StudyForm) => {
    const file = await fileHandler.upload(imageFile)
    const fileUrl = file.supabaseFileData.url
    console.log('파일을 임시로 업로드 했습니다.')

    const res = await fetchData(API_ENDPOINTS.STUDY.CREATE, {
      body: JSON.stringify({ ...data, imageSrc: fileUrl })
    })
    if (!res.ok) {
      await file.delete()
      console.error('백엔드 서버에 반영 실패. Supabase에 업로드 한 파일을 삭제합니다.')
      return
    }
    file.commit()
  }
   ```
*/
export const useSupabaseFile = ({
  bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME,
  pathPrefix = `${process.env.NODE_ENV}/uploads/`,
  autoDeleteDelay = MINUTES_10
}: UseSupabaseFileOptions) => {
  const [deleteTimer, setDeleteTimer] = useState<ReturnType<typeof setTimeout> | null>(null)

  const upload = useCallback(
    async (file: File): Promise<SupabaseFile> => {
      const sanitizedFileName = sanitizeFileName(file.name)
      const fileName = `${Date.now()}-${sanitizedFileName}`
      const fullPath = `${pathPrefix}${fileName}`

      const { data, error: uploadError } = await supabase.storage.from(bucketName).upload(fullPath, file, {
        cacheControl: MINUTES_10.toString(),
        upsert: false
      })

      if (uploadError) {
        throw new Error(uploadError.message)
      }

      const fileUrl = supabase.storage.from(bucketName).getPublicUrl(data.path).data.publicUrl

      const commit = () => {
        if (deleteTimer) {
          clearTimeout(deleteTimer)
          setDeleteTimer(null)
        }
        console.log('파일 업로드가 실제로 완료되었습니다.')
      }

      const deleteFile = async () => {
        const { error: deleteError } = await supabase.storage.from(bucketName).remove([data.path])

        if (deleteError) {
          console.error(deleteError.message)
          return
        }

        console.log('파일이 삭제되었습니다.')
      }

      if (autoDeleteDelay > 0) {
        const timer = setTimeout(async () => {
          await deleteFile()
        }, autoDeleteDelay)
        setDeleteTimer(timer)
      }

      const newFileInfo = {
        file,
        supabaseFileData: {
          ...data,
          url: fileUrl
        },
        commit,
        delete: deleteFile
      }

      return newFileInfo
    },
    [bucketName, pathPrefix, autoDeleteDelay, deleteTimer]
  )

  useEffect(() => {
    // Cleanup the timer on component unmount
    return () => {
      if (deleteTimer) {
        clearTimeout(deleteTimer)
      }
    }
  }, [deleteTimer])

  return {
    upload
  }
}
