import Image from 'next/image'
type IntroduceCardProps = {
  name: string
  status: string
  description: string
  imageUrl: string
}
export default function IntroduceCard({
  name,
  status,
  description,
  imageUrl
}: IntroduceCardProps) {
  return (
    <div className="flex h-[180px] w-[620px] items-center justify-between">
      <div className="relative h-full w-[180px] rounded-[40px] bg-black">
        <Image
          src={imageUrl}
          alt={name}
          width={180}
          height={180}
          className="h-full rounded-[40px] object-cover"
          unoptimized
        />
      </div>
      <div className="flex h-full w-[420px] items-center justify-center rounded-lg border-[1px] border-[#7A7A7A]">
        <div className="flex h-[150px] w-[360px] flex-col gap-2">
          <p className="text-[28px] font-medium">
            {name} / {status}
          </p>
          <p className="w-full text-[24px] font-medium">{description}</p>
        </div>
      </div>
    </div>
  )
}
