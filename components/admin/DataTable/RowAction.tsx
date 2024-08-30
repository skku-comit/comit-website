import { Table } from '@tanstack/react-table'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CustomResponseDTO } from '@/lib/response'

enum ActionTypes {
  delete = '삭제',
  open = '모집 시작',
  close = '모집 중단'
}
type ActionType = keyof typeof ActionTypes

const RowAction = ({
  table,
  getRowSelection
}: {
  table: Table<any>
  getRowSelection: () => Record<string, boolean>
}) => {
  const [selectedAction, setSelectedAction] = useState<ActionType>('delete')

  async function handleApplyButtonClick() {
    let data: CustomResponseDTO
    const rowSelection = getRowSelection()
    const selectedIds = Object.keys(rowSelection).map(
      (rowIndex) => table.getRowModel().rows[parseInt(rowIndex)].original.id
    )

    switch (selectedAction) {
      case 'delete':
        console.log(`Delete ${selectedIds}`)
        // const res = await fetchData(API_ENDPOINTS.STUDY.DELETE(selectedIds), {
        //   cache: 'no-cache'
        // })
        // const json = await res.json()
        // data = await json.data
        break
      case 'open':
        console.log(`Open ${selectedIds}`)
        // const res = await fetchData(API_ENDPOINTS.STUDY.UPDATE(selectedIds), {
        //   cache: 'no-cache'
        // })
        // const json = await res.json()
        // data = await json.data
        break
      case 'close':
        console.log(`Close ${selectedIds}`)
        // const res = await fetchData(API_ENDPOINTS.STUDY.UPDATE(selectedIds), {
        //   cache: 'no-cache'
        // })
        // const json = await res.json()
        // data = await json.data
        break
      default:
        console.error(`Invalid action type '${selectedAction}'`)
    }
    console.warn(
      `${selectedIds.length}개의 데이터를 ${ActionTypes[selectedAction]} 하려고 시도했지만 도입되지 않은 기능입니다.\n여러 개의 레코드를 처리 할 수 있는 API를 도입해야 합니다!      `
    )
  }

  return (
    <div className="flex items-center gap-x-2">
      <Select onValueChange={(selection: ActionType) => setSelectedAction(selection)}>
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue placeholder={ActionTypes.delete} />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(ActionTypes).map((key) => (
            <SelectItem key={key} value={key}>
              {ActionTypes[key as ActionType]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button className="h-8 px-3" onClick={handleApplyButtonClick}>
        적용
      </Button>
    </div>
  )
}

export default RowAction
