import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export enum Align {
  LEFT = 'left',
  RIGHT = 'right'
}

interface ClburoomInfoCardType {
  title: string
  description: string
  align?: Align
}

export default function ClburoomInfoCard({ title, description, align }: ClburoomInfoCardType) {
  return (
    <Card
      className={cn(
        'flex h-[108px] w-[344px] items-center justify-center rounded-3xl bg-[#D9D9D9] bg-opacity-20 shadow-md sm:w-[360px] lg:w-[400px] xl:w-[420px]',
        align === Align.RIGHT && 'lg:ml-20'
      )}
    >
      <div className="flex flex-col justify-around gap-2 px-8">
        <p className="text-left text-xl font-bold">{title}</p>
        <CardContent className="p-0">
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </div>
    </Card>
  )
}
