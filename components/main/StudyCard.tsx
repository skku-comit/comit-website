import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

interface StudyCardProps {
  imageSrc: string
  title: string
  description: string
  badges: string[]
}

export default function StudyCard({
  imageSrc,
  title,
  description,
  badges
}: StudyCardProps) {
  return (
    <Card className="flex w-[268px] min-w-52 transform flex-col items-center justify-center overflow-hidden px-4 py-8">
      <Image
        src={imageSrc}
        alt={title}
        width={180}
        height={180}
        className="mb-8 mt-4"
        unoptimized
      ></Image>
      <CardTitle className="text-center text-lg">{title}</CardTitle>
      <CardDescription className="text-center text-base">
        {description}
      </CardDescription>
      <div className="mt-2 flex w-52 flex-wrap justify-around gap-2">
        {badges.map((badge, index: number) => (
          <Badge
            key={index}
            variant="secondary"
            className="flex h-8 w-16 items-center justify-center"
          >
            {badge}
          </Badge>
        ))}
      </div>
    </Card>
  )
}
