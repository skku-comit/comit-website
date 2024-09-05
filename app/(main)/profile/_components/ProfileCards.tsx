'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { Session } from 'next-auth'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { API_ENDPOINTS, ApiEndpoint } from '@/constants/apiEndpoint'
import { profileUpdateSchema } from '@/constants/zodSchema/profileUpdate'
import { fetchData } from '@/lib/fetch'
import { useSupabaseFile } from '@/lib/supabase/hooks'
import { UserProfile } from '@/types'

type ProfileForm = {
  profileImage: string | null
  bio: string | null
}

type ProfileProps = {
  session: Session
  user: UserProfile
}

const ProfileCards = ({ session, user }: ProfileProps) => {
  const { toast } = useToast()

  const { handleSubmit, register, setValue } = useForm<ProfileForm>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      profileImage: user.profileImage,
      bio: user.bio
    }
  })

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [image, setImage] = useState<string>(user.profileImage ?? '')

  const fileRef = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    fileRef?.current?.click()
  }

  const fileHandler = useSupabaseFile({ pathPrefix: 'image/profile' })

  const handleFileChange = (e: React.ChangeEvent) => {
    const targetFiles = (e.target as HTMLInputElement).files as FileList
    // 예외 Case: 파일 입력 후 다시 닫을때
    if (targetFiles.length) {
      const selectedFile = URL.createObjectURL(targetFiles[0])
      setImage(selectedFile)
      setValue('profileImage', selectedFile)
      setImageFile(targetFiles[0])
    }
  }

  const onSubmit = async (data: ProfileForm) => {
    const { profileImage, bio } = data
    if (profileImage === user.profileImage && bio === user.bio) {
      toast({
        title: '프로필 수정 실패',
        description: '변경된 정보가 없습니다!',
        variant: 'destructive'
      })
      return
    }
    setIsSubmitting(true)

    if (imageFile) {
      const file = await fileHandler.upload(imageFile)
      const fileUrl = file.supabaseFileData.url

      const res = await fetchData(API_ENDPOINTS.CLIENT.PROFILE.UPDATE as ApiEndpoint, {
        body: JSON.stringify({
          ...data,
          profileImage: fileUrl
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.data?.accessToken}`
        },
        credentials: 'include'
      })
      if (!res.ok) {
        await file.delete()
        setIsSubmitting(false)
        return
      }
      file.commit()
    } else {
      const res = await fetchData(API_ENDPOINTS.CLIENT.PROFILE.UPDATE as ApiEndpoint, {
        body: JSON.stringify({
          ...data,
          profileImage: user.profileImage
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.data?.accessToken}`
        },
        credentials: 'include'
      })
      if (!res.ok) {
        setIsSubmitting(false)
        return
      }
    }
    toast({
      title: '프로필 수정 완료',
      description: '프로필이 성공적으로 수정되었습니다!'
    })
    setIsSubmitting(false)
  }

  return (
    <div className="flex items-center gap-6 max-md:flex-col">
      <form
        className="flex w-96 flex-col gap-4 rounded-xl border border-gray-200 p-8 max-sm:w-[92%] max-sm:p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <p className="text-xl font-bold">프로필 정보</p>
          <p className="text-sm text-gray-400">임원진의 프로필만 타인에게 노출됩니다</p>
        </div>
        <div className="flex flex-col gap-1">
          <Button
            type="button"
            variant={'outline'}
            onClick={handleClick}
            className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border border-slate-300"
          >
            {!image ? (
              <p className="text-5xl font-light text-slate-300">+</p>
            ) : (
              <Image src={image} width={208} height={208} alt={image} className="h-full w-full object-cover" />
            )}
          </Button>
          <Input className="hidden" accept="image/*" type="file" ref={fileRef} onChange={handleFileChange} />
        </div>
        <div>
          <p className="font-semibold">자기소개</p>
          <Textarea id="bio" {...register('bio')} placeholder="소개글을 작성해주세요!" />
        </div>
        <div className="flex justify-end">
          <Button className="w-16 content-end text-base font-semibold" type="submit" disabled={isSubmitting}>
            저장
          </Button>
        </div>
      </form>

      <div className="flex w-96 flex-col gap-4 rounded-xl border border-gray-200 p-8 max-sm:min-w-[92%] max-sm:max-w-[92%] max-sm:p-5">
        <p className="mb-3 text-xl font-bold">계정 정보</p>
        <div className="border-b border-gray-200">
          <p className="text-sm text-gray-700">직책</p>
          <p className="text-lg">{user.position}</p>
        </div>
        <div className="border-b border-gray-200">
          <p className="text-sm text-gray-700">이름</p>
          <p className="text-lg">{user.username}</p>
        </div>
        <div className="border-b border-gray-200">
          <p className="text-sm text-gray-700">이메일</p>
          <p className="text-lg">{user.email}</p>
        </div>
        <div className="border-b border-gray-200">
          <p className="text-sm text-gray-700">학번</p>
          <p className="text-lg">{user.studentId}</p>
        </div>
        <div>
          <p className="text-sm text-gray-700">휴대폰</p>
          <p className="text-lg">{user.phoneNumber}</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileCards
