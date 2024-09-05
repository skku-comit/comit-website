export default function MyStudyHeader() {
  return (
    <section className="flex h-20 w-full items-center bg-gray-800 py-2 sm:h-28 sm:py-6">
      <div className="mx-auto flex flex-col gap-1 text-white sm:gap-4 lg:w-3/5">
        <h2 className="text-lg font-semibold sm:h-6 sm:text-2xl">내가 개설한 스터디를 확인해보세요</h2>
        <p className="text-sm font-medium sm:text-lg">강의 수강에서 더 나아가 함께 스터디까지!</p>
      </div>
    </section>
  )
}
