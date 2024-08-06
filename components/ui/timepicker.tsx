'use client'

import * as React from 'react'

import { TimePickerInput, TimePickerInputProps } from '@/components/ui/time-picker-input'

interface TimePickerProps extends Omit<TimePickerInputProps, 'picker'> {
  className?: string
}

export function TimePicker({ className, ...props }: TimePickerProps) {
  const hourRef = React.useRef<HTMLInputElement>(null)
  const minuteRef = React.useRef<HTMLInputElement>(null)

  return (
    <>
      <div className="flex items-end gap-2">
        <div className="grid gap-1 text-center">
          <TimePickerInput {...props} picker="hours" ref={hourRef} onRightFocus={() => minuteRef.current?.focus()} />
        </div>
        <div className="grid gap-1 text-center">
          <TimePickerInput {...props} picker="minutes" ref={minuteRef} onLeftFocus={() => hourRef.current?.focus()} />
        </div>

        {/* <div className="flex h-10 items-center">
        
      </div> */}
      </div>
    </>
  )
}
