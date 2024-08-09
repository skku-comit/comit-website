import Image from 'next/image'

import StudyImage from '@/public/study-image/study.png'

interface ImageSectionProps {
  className?: string
}
// Todo: Image source 넣기
export default function ImageSection({ className }: ImageSectionProps) {
  return (
    <div className="relative h-full w-full">
      <Image src={StudyImage} alt="Study Image" fill />
    </div>
  )
}
