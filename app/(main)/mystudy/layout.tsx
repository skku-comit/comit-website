import React from 'react'

import MyStudyHeader from '@/components/mystudy/MyStudyHeader'
import MyStudyNavBar from '@/components/mystudy/MyStudyNavBar'

const MyStudyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="w-full">
        <MyStudyHeader />
        <section className="mx-auto flex max-w-7xl px-4 pb-12 pt-[18px] max-sm:flex-col sm:px-8 sm:pb-16 sm:pt-8">
          <MyStudyNavBar />
          {children}
        </section>
      </main>
    </>
  )
}

export default MyStudyLayout
