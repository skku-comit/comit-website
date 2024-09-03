export default function MyStudyHeader() {
  return (
    <section id="mystudy-header" className="box-border flex h-20 w-full items-center bg-[#333b3d] py-2 sm:h-28 sm:py-6">
      <div id="mystudy-header__content" className="mx-auto box-border text-white lg:w-3/5">
        <h2 id="mystudy-header__title" className="block text-xl font-semibold sm:h-6 sm:text-[28px]">
          내가 신청하거나 개설한 스터디를 확인해보세요
        </h2>
        <p id="mystudy-header__sub-title" className="mt-1 block text-[14px] font-medium sm:mt-4 sm:text-lg">
          강의 수강에서 더 나아가 함께 스터디까지!
        </p>
      </div>
    </section>
  )
}
