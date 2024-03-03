interface SectionBannerProps {
  title: string
  description: string
}

export default function SectionBanner({
  title,
  description
}: SectionBannerProps) {
  return (
    <div className="flex h-48 w-screen flex-col items-center justify-center gap-5 sm:h-56">
      <p className="text-5xl font-semibold sm:text-6xl">{title}</p>
      <p className="text-lg font-bold sm:text-xl">{description}</p>
    </div>
  )
}
