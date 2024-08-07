import Image from 'next/image'

import StudyImage from '@/public/study-image/study.png'

interface ImageSectionProps {
  className?: string
}

export default function ImageSection({ className }: ImageSectionProps) {
  return (
    <div className="relative h-64 w-full md:h-96">
      <Image src={StudyImage} alt="Study Image" fill />
    </div>
  )
}
