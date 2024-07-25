'use client'

import { useEffect, useState } from 'react'

import { columns } from '@/components/columns/Study'
import { DataTable } from '@/components/common/DataTable'
import { Button } from '@/components/ui/button'
import { StudyRecord } from '@/types/Study'

export default function Opened() {
  const [studyRecords, setStudyRecords] = useState<StudyRecord[]>([])
  useEffect(() => {
    const res = fetch('api/study-records?status=opened')
    res.then((res) => res.json()).then((data) => setStudyRecords(data))
  }, [])

  return (
    <div className="flex flex-col gap-8 pt-24">
      <div className="flex items-center justify-between">
        <div className="text-5xl font-semibold">Opened Studies</div>
        <Button>Close All</Button>
      </div>
      <DataTable columns={columns} data={studyRecords} />
    </div>
  )
}
