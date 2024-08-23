import ClubroomMainContent from '@/components/clubroom/ClubroomMainContent'
import SectionBanner from '@/components/common/SectionBanner'

export default function Clubroom() {
  return (
    <>
      <SectionBanner title="Clubroom" description="CoMit의 동아리방을 소개합니다!" />
      <ClubroomMainContent />
      <div className="min-h-[81px]"></div> {/* footer를 딱맞게 내리기 위해 넣은 empty div */}
    </>
  )
}
