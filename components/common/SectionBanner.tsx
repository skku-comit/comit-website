import { cn } from '@/lib/utils'

interface SectionBannerProps {
  title: string
  description: string
  className: string
}

export default function SectionBanner({ title, description, className }: SectionBannerProps) {
  return (
    <div className={cn('flex h-48 w-screen flex-col items-center justify-center gap-5 sm:h-56', className)}>
      <p className="text-5xl font-semibold sm:text-5xl">{title}</p>
      <p className="text-lg font-bold sm:text-xl">{description}</p>
    </div>
  )
}
