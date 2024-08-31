'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { API_ENDPOINTS, ApiEndpoint } from '@/constants/apiEndpoint'
import { fetchData } from '@/lib/fetch'
import { CustomResponseDTO } from '@/lib/response'
import { Study } from '@/types'

interface EditableCellProps {
  fieldName: keyof Study
  row: {
    original: Study
  }
  readonly?: boolean
}

const EditableCell: React.FC<EditableCellProps> = ({ fieldName, row, readonly }) => {
  const initialValue = row.original[fieldName]
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string | number | boolean | string[]>(initialValue ?? '')
  const [inputValue, setInputValue] = useState<string | number | boolean | string[]>(initialValue ?? '')
  const id = row.original.id

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setValue(inputValue) // Optimistic update
    setOpen(false)
    const res = await fetchData(API_ENDPOINTS.STUDY.UPDATE(id) as ApiEndpoint, {
      body: JSON.stringify({ [fieldName]: inputValue }),
      cache: 'no-cache'
    })
    if (!res.ok) {
      console.error('Failed to update', fieldName, id, inputValue)
      return
    }
    const data: CustomResponseDTO = await res.json()
    if (!data.data) return // Supabase 사용 시에는 data가 null임
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
              onChange={() => setInputValue((prev) => !prev)}
              className={inputClass}
            />
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
