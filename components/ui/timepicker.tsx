'use client'

import { useRef, useState } from 'react'

import { TimePickerInput, TimePickerInputProps } from '@/components/ui/time-picker-input'
import { cn } from '@/lib/utils'

interface TimePickerProps extends Omit<TimePickerInputProps, 'picker'> {
  className?: string
}

export function TimePicker({ className, ...props }: TimePickerProps) {
  const hourRef = useRef<HTMLInputElement>(null)
  const minuteRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const handleFocus = () => setIsFocused((prev) => !prev)

  return (
    <div
      className={cn(
        `flex items-center gap-1 rounded-md border border-input text-center ${isFocused && 'ring-2 ring-ring ring-offset-2'}`
      )}
    >
      <TimePickerInput
        {...props}
        picker="hours"
        ref={hourRef}
        onRightFocus={() => minuteRef.current?.focus()}
        onFocus={handleFocus}
        onBlur={handleFocus}
        className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      :
      <TimePickerInput
        {...props}
        picker="minutes"
        ref={minuteRef}
        onLeftFocus={() => hourRef.current?.focus()}
        onFocus={handleFocus}
        onBlur={handleFocus}
        className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  )
}
