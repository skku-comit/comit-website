'use client'
import Image from 'next/image'
import { useEffect,useState } from 'react'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import UnderConstruction from '@/public/under_construction.png'

export default function UnderConstructionDialog() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(true)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-84">
        <div className="flex flex-col items-center gap-4">
          <div className="flex justify-center">
            <Image
              src={UnderConstruction}
              width={300}
              alt="under_construction"
            />
          </div>
          <p className="text-center text-[4vw] font-bold sm:text-4xl">
            COMING SOON!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}