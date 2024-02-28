import {
  Card,
  CardContent,
  CardDescription,
  CardTitle
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

export enum Align {
  LEFT = 'left',
  RIGHT = 'right'
}
type ClburoomInfoCardType = {
  title: string
  description: string
  align?: Align
}
export default function ClburoomInfoCard({
  title,
  description,
  align
}: ClburoomInfoCardType) {
  return (
    <Card
      className={cn(
        'flex h-[108px] w-[384px] items-center justify-center rounded-[40px] bg-[#D9D9D9] bg-opacity-20 shadow-md',
        align === Align.RIGHT && 'ml-20'
      )}
    >
      <div className=" h-[70%] w-[80%]">
        <CardTitle className="text-left">{title}</CardTitle>
        <CardContent className="p-0 pt-2">
          <CardDescription className="">
            <p>{description}</p>
          </CardDescription>
        </CardContent>
      </div>
    </Card>
  )
}
