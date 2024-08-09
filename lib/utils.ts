import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type Partial<T> = {
  [P in keyof T]?: T[P]
}

export type ReadOnly<T> = {
  readonly [P in keyof T]: T[P]
}
