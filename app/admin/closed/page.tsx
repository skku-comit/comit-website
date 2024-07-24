'use client'

import { useEffect, useState } from 'react'

import { columns } from '@/components/columns/Study'
import { DataTable } from '@/components/common/DataTable'
import { StudyRecord } from '@/types/Study'

export default function Closed() {
  const [studyRecords, setStudyRecords] = useState<StudyRecord[]>([])
  useEffect(() => {
    const res = fetch('api/studyRecords?status=closed')
    res.then((res) => res.json()).then((data) => setStudyRecords(data))
  }, [])

  return (
    <div className="flex flex-col gap-8 pt-24">
      <div className="text-5xl font-semibold">Closed Studies</div>
      <DataTable columns={columns} data={studyRecords} />
    </div>
  )
}
