import React from 'react'

import MyStudyHeader from '@/components/mystudy/MyStudyHeader'
import MyStudyLeftSide from '@/components/mystudy/MyStudyLeftSide'

const MyStudyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main id="main" className="w-full">
        <MyStudyHeader />
        <section id="mystudy-body" className="mx-auto my-0 box-border flex max-w-7xl flex-row px-8">
          <MyStudyLeftSide />
          {children}
        </section>
      </main>
    </>
  )
}

export default MyStudyLayout
