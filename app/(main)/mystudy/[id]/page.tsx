'use client'

import Image from 'next/image'
import { notFound, redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import EasyEdit, { Types } from 'react-easy-edit'
import { BsQuestionCircle } from 'react-icons/bs'

import { HttpStatusCode } from '@/app/api/utils/httpConsts'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { API_ENDPOINTS } from '@/constants/apiEndpoint'
import { ROUTES } from '@/constants/routes'
import { fetchData } from '@/lib/fetch'
import { useSupabaseFile } from '@/lib/supabase/hooks'
import { Study } from '@/types'

interface StudyDetailProps {
  params: {
    id: number
  }
}

export default function StudyDetailPage({ params }: StudyDetailProps) {
  const session = useSession()
  const accessToken = session.data?.accessToken.token
  if (!accessToken) {
    redirect(ROUTES.LOGIN.url)
  }

  const [editing, setEditing] = useState<boolean>(false)
  const [study, setStudy] = useState<Study>()

  const { id } = params
  const fileHandler = useSupabaseFile({ pathPrefix: `image/study/${id}` })

  async function handleSave(id: number, field: string, value: any) {
    let file: any
    const body = { [field]: value }
    if (field === 'imageSrc') {
      file = fileHandler.upload(value)
    }
    const res = await fetchData(API_ENDPOINTS.CLIENT.STUDY.UPDATE(id), {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!res.ok) {
      if (file) {
        file.delete()
      }
      throw new Error('스터디 정보를 수정하는 중 오류가 발생했습니다.')
    }

    const data = (await res.json()).data
    setStudy(data)
  }

  useEffect(() => {
    fetchData(API_ENDPOINTS.CLIENT.STUDY.RETRIEVE(id), {
      cache: 'no-cache'
    }).then((res) => {
      if (!res.ok) {
        switch (res.status) {
          case HttpStatusCode.NotFound:
            notFound()
          default:
            throw new Error('스터디 정보를 불러오는 중 오류가 발생했습니다.')
        }
      }
      return res.json().then((json) => {
        setStudy(json.data)
      })
    })
  }, [id])

  if (!study) {
    return <div></div>
  }
  return (
    <div className="flex w-full flex-col gap-6 py-12">
      <div className="relative flex items-start gap-8 max-md:flex-col">
        <div className="flex max-sm:w-full max-sm:justify-center">
          <Image src={study.imageSrc} alt={study.imageSrc} className="border object-cover" width={208} height={208} />
        </div>
        <span className="rounded-xl bg-purple-600 px-3 py-1 text-sm font-bold text-white sm:absolute sm:right-2">
          스터디장
        </span>
        <div className="flex w-full flex-col gap-3 text-[17px] font-medium sm:my-4">
          <h3 className="flex items-center gap-2">
            <span className="font-semibold">제목:</span>
            <EasyEdit
              type={Types.TEXT}
              value={study.title}
              onSave={(val) => handleSave(id, 'title', val)}
              saveButtonLabel={<span className="text-green-500">수정</span>}
              cancelButtonLabel={<span className="text-destructive">취소</span>}
            />
          </h3>

          <h3 className="flex items-center gap-2">
            <span className="font-semibold">캠퍼스:</span>
            {
              <EasyEdit
                type="select"
                options={[
                  { label: '공통', value: '공통' },
                  { label: '율전', value: '율전' },
                  { label: '명륜', value: '명륜' }
                ]}
                onSave={(val) => handleSave(id, 'campus', val)}
                placeholder={study.campus}
                saveButtonLabel={<span className="text-green-500">수정</span>}
                cancelButtonLabel={<span className="text-destructive">취소</span>}
              />
            }
          </h3>
          <h3 className="flex items-center gap-2">
            <span className="font-semibold">난이도:</span>
            {
              <EasyEdit
                type="select"
                options={[
                  { label: '초급', value: '초급' },
                  { label: '중급', value: '중급' },
                  { label: '고급', value: '고급' }
                ]}
                onSave={(val) => handleSave(id, 'level', val)}
                placeholder={study.level}
                saveButtonLabel={<span className="text-green-500">수정</span>}
                cancelButtonLabel={<span className="text-destructive">취소</span>}
              />
            }
          </h3>

          <h3 className="flex items-center gap-2">
            <span className="flex items-center gap-2 font-semibold">
              관련 스택
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button>
                      <BsQuestionCircle className="hover:text-primary" size={15} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>스택 간에는 쉼표(,)를 사용해 구분해 주세요.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              :
            </span>
            <EasyEdit
              type={Types.TEXT}
              value={study.stacks.join(', ')}
              onSave={(val) => handleSave(id, 'stacks', val)}
              saveButtonLabel={<span className="text-green-500">수정</span>}
              cancelButtonLabel={<span className="text-destructive">취소</span>}
            />
          </h3>
          <h3 className="flex items-center">
            <span className="mr-2 font-semibold">요일 / 시간:</span>
            <div className="flex gap-2">
              <EasyEdit
                type="select"
                options={[
                  { label: '월요일', value: '월요일' },
                  { label: '화요일', value: '화요일' },
                  { label: '수요일', value: '수요일' },
                  { label: '목요일', value: '목요일' },
                  { label: '금요일', value: '금요일' },
                  { label: '토요일', value: '토요일' },
                  { label: '일요일', value: '일요일' }
                ]}
                onSave={(val) => handleSave(id, 'day', val)}
                placeholder={`${study.day}요일`}
                saveButtonLabel={<span className="text-green-500">수정</span>}
                cancelButtonLabel={<span className="text-destructive">취소</span>}
              />
              <EasyEdit
                type={Types.TIME}
                value={study.startTime}
                onSave={(val) => handleSave(id, 'startTime', val)}
                placeholder="Select time"
                saveButtonLabel={<span className="text-green-500">수정</span>}
                cancelButtonLabel={<span className="text-destructive">취소</span>}
              />
              <EasyEdit
                type={Types.TIME}
                value={study.endTime}
                onSave={(val) => handleSave(id, 'endTime', val)}
                saveButtonLabel={<span className="text-green-500">수정</span>}
                cancelButtonLabel={<span className="text-destructive">취소</span>}
                placeholder="Select time"
              />
            </div>
          </h3>

          {/* You can add more study details here */}
        </div>
      </div>
      <div className="flex w-full flex-col gap-3">
        <span className="text-[18px] font-bold">스터디 설명</span>
        {study.description && (
          <Textarea
            name="study-description"
            id="description"
            className="h-12 w-full px-2 py-1"
            disabled={!editing}
            autoFocus={editing}
            value={study.description}
            onChange={(e) => setStudy((prev: any) => ({ ...prev, description: e.target.value }))}
          />
        )}
        {!editing ? (
          <div>
            <Button
              className="px-3 py-1 text-sm"
              onClick={() => {
                setEditing(true)
              }}
            >
              수정
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              className="px-3 py-1 text-sm"
              onClick={() => {
                setEditing(false)
                handleSave(id, 'description', study.description)
              }}
            >
              제출
            </Button>
            <Button
              className="bg-slate-400 px-3 py-1 text-sm hover:bg-slate-400/80"
              onClick={() => {
                setEditing(false)
              }}
            >
              취소
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
