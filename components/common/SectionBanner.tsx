import { cn } from '@/lib/utils'

interface SectionBannerProps {
  title: string
  description?: string
  className?: string
  titleClassName?: string
  descriptionClassName?: string
}

export default function SectionBanner({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName
}: SectionBannerProps) {
  return (
    <div className={cn('flex h-48 w-screen flex-col items-center justify-center gap-5 sm:h-56', className)}>
      <p className={cn('text-5xl font-semibold sm:text-5xl', titleClassName)}>{title}</p>
      {description && <p className={cn('text-lg font-bold sm:text-xl', descriptionClassName)}>{description}</p>}
    </div>
  )
}
