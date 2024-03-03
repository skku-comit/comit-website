import Image from 'next/image'
type IntroduceMemberCardProps = {
  name: string
  position: string
  description: string
  imageUrl: string
}
export default function IntroduceMemeberCard({
  name,
  position,
  description,
  imageUrl
}: IntroduceMemberCardProps) {
  return (
    <div className="flex items-center gap-8 max-md:flex-col">
      <div className="relative h-[168px] w-[168px] overflow-hidden rounded-[40px] shadow-md hover:scale-110 transform transition-transform">
        <Image
          src={imageUrl}
          alt={name}
          width={168}
          height={168}
          unoptimized
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex h-44 w-96 rounded-3xl border p-8 shadow-md">
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold">
            {name} / {position}
          </p>
          <p className="w-full text-[20px] font-medium">{description}</p>
        </div>
      </div>
    </div>
  )
}
