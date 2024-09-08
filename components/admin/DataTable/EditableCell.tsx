'use client'

import { redirect } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import { ApiEndpoint } from '@/constants/apiEndpoint'
import { ROUTES } from '@/constants/routes'
import { useSession } from '@/lib/auth/SessionProvider'
import { fetchData } from '@/lib/fetch'
import { CustomResponseDTO } from '@/lib/response'

const roleOptions = [
  {
    value: 'ROLE_MEMBER',
    label: '회원'
  },
  {
    value: 'ROLE_VERIFIED',
    label: '부원'
  },
  {
    value: 'ROLE_ADMIN',
    label: '관리자'
  }
]

interface EditableCellProps {
  fieldName: any
  row: {
    original: any
  }
  readonly?: boolean
  submitApiEndpoint: ApiEndpoint
}

const EditableCell: React.FC<EditableCellProps> = ({ fieldName, row, readonly, submitApiEndpoint }) => {
  const session = useSession()
  if (!session) {
    redirect(ROUTES.LOGIN.url)
  }
  if (session.error) {
    redirect(ROUTES.LOGIN.url)
  }
  const accessToken = session.data?.accessToken

  if (!accessToken) {
    redirect(ROUTES.LOGIN.url)
  }

  const { toast } = useToast()
  const initialValue = row.original[fieldName]
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<any>(initialValue ?? '')
  const [inputValue, setInputValue] = useState<any>(initialValue ?? '')
  const id = row.original.id

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (accessToken === undefined) {
      redirect(ROUTES.LOGIN.url)
    }
    e.preventDefault()
    setValue(inputValue)
    setOpen(false)

    const res = await fetchData(submitApiEndpoint, {
      body: JSON.stringify({ [fieldName]: inputValue }),
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    if (!res.ok) {
      toast({
        title: '수정 실패',
        description: '수정 중 서버 에러 발생, 로그를 확인해주세요!',
        variant: 'destructive'
      })
      console.error('Failed to update', fieldName, id, inputValue)
      return
    }
    toast({
      title: '수정 완료',
      description: '성공적으로 수정되었습니다!'
    })
    const data: CustomResponseDTO = await res.json()
    const updatedFieldResult = data.data[fieldName]
    setValue(updatedFieldResult) // 실제 업데이트
  }

  const inputClass = 'py-1 m-0 h-8 text-xs'

  return (
    <Popover open={open} onOpenChange={() => setOpen(!readonly && true)}>
      <PopoverTrigger className="m-1 h-full w-full rounded border hover:bg-slate-200">
        <div className="max-w-[16rem] overflow-hidden whitespace-nowrap px-2 text-start">{value.toString()}</div>
      </PopoverTrigger>
      <PopoverContent className="p-2" onEscapeKeyDown={() => setOpen(false)}>
        <form onSubmit={handleSubmit}>
          {typeof inputValue === 'boolean' ? (
            <Input
              type="checkbox"
              checked={inputValue}
              onChange={() => setInputValue((prev: any) => !prev)}
              className={inputClass}
              disabled={readonly}
            />
          ) : fieldName === 'role' ? (
            <Tabs
              value={value}
              onValueChange={(e) => {
                setInputValue(e)
                setValue(e)
              }}
            >
              <TabsList>
                {roleOptions.map((role) => (
                  <TabsTrigger key={role.value} value={role.value}>
                    {role.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          ) : (
            <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className={inputClass} />
          )}
          <div className="mt-2 flex justify-end gap-x-2">
            <Button variant="ghost" type="reset" onClick={() => setOpen(false)} className="h-8 p-2 text-sm">
              취소
            </Button>
            <Button type="submit" className="h-8 p-2 text-sm">
              저장
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default EditableCell
