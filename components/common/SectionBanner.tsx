interface SectionBannerProps {
  title: string
  description: string
}

export default function SectionBanner({
  title,
  description
}: SectionBannerProps) {
  return (
    <div className="flex h-48 w-screen flex-col items-center justify-center gap-5">
      <p className="text-5xl font-semibold">{title}</p>
      <p className="font-bold text-lg">{description}</p>
    </div>
  )
}
