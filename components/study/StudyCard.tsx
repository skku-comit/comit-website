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
    <Card className="flex min-w-52 flex-col items-center justify-center overflow-hidden px-4 py-8 cursor-pointer hover:bg-slate-50 transition-transform transform hover:scale-105">
      <Image
        src={imageSrc}
        alt={title}
        width={120}
        height={120}
        className="mt-4 mb-8"
        unoptimized
      ></Image>
      <CardTitle className="text-center text-base">{title}</CardTitle>
      <CardDescription className="text-center">{description}</CardDescription>
      <div className="mt-2 flex w-48 flex-wrap justify-around gap-2">
        {badges.map((badge, index: number) => (
          <Badge key={index} variant="secondary">
            {badge}
          </Badge>
        ))}
      </div>
    </Card>
  )
}
