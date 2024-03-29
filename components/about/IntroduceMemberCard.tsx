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
      <div className="relative h-[168px] w-[168px] transform overflow-hidden rounded-[40px] shadow-md transition-transform hover:scale-125">
        <Image
          src={imageUrl}
          alt={name}
          width={168}
          height={168}
          unoptimized
          className="h-full w-full object-cover"
        />
      </div>
      <div className="h-36 w-80 rounded-3xl border p-5 shadow-md sm:h-44 sm:w-96 sm:p-7">
        <div className="flex flex-col gap-1 sm:gap-2">
          <p className="text-xl font-semibold sm:text-2xl">
            {name} / {position}
          </p>
          <p className="w-full text-base font-medium sm:text-lg">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
