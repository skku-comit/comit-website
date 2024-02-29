interface SectionBannerProps {
  title: string
  description: string
}

export default function SectionBanner({
  title,
  description
}: SectionBannerProps) {
  return (
    <div className="flex h-56 w-screen flex-col items-center justify-center gap-5">
      <p className="text-6xl font-semibold">{title}</p>
      <p className="text-xl font-bold">{description}</p>
    </div>
  )
}
