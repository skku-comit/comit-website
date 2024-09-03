import './mystudy.css'

import React from 'react'

import MyStudyHeader from '@/components/mystudy/MyStudyHeader'
import MyStudyNavBar from '@/components/mystudy/MyStudyNavBar'

const MyStudyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="w-full">
        <MyStudyHeader />
        <section className="mx-auto flex max-w-7xl px-8 max-sm:flex-col">
          <MyStudyNavBar />
          {children}
        </section>
      </main>
    </>
  )
}

export default MyStudyLayout
