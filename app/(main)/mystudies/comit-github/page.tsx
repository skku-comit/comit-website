'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ReactStars from 'react-rating-stars-component'

import MyStudyHeader from '@/components/mystudies/MyStudyHeader'
import MyStudyLeftSide from '@/components/mystudies/MyStudyLeftSide'

export default function IntroduceComitGithub() {
  const { register, handleSubmit } = useForm()
  const [rating, setRating] = useState(0)
  const [userRated, setUserRated] = useState(false)
  const onSubmit = (data: any) => {
    console.log({ feedback: data.feedback || data.improvement, rating: rating })
    //DB로 해당 데이터 전송하는 로직

    setUserRated(true)
  }
  const ratingChanged = (newRating: number) => {
    setRating(newRating)
  }

  return (
    <>
      <main id="main" className="w-full">
        <MyStudyHeader />

        <section id="mystudy-body" className="mx-auto my-0 box-border flex max-w-7xl flex-row px-8">
          <MyStudyLeftSide />
          <div id="mystudy-body__content" className="box-border flex max-w-full flex-1 flex-col pb-16 pt-8">
            {!userRated && (
              <div id="website-survey" className="mx-auto mt-8 w-full text-center">
                <h3 className="text-lg"> 동아리 활동에 대해 전반적으로 만족하시나요?</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex max-w-full flex-col items-center">
                  <div className="mb-1 flex justify-center">
                    <ReactStars count={5} onChange={ratingChanged} size={24} activeColor="#ffd700" />
                  </div>
                  {rating <= 3 && rating > 0 && (
                    <>
                      <p className="mb-2 text-lg">
                        동아리가 개선해야 할 점을 말씀해주세요. (설문조사 데이터는 전부 익명으로 전송됩니다)
                      </p>
                      <textarea
                        {...register('improvement', { required: rating <= 3 })}
                        placeholder="여기에 의견을 작성해주세요."
                        rows={6}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-[16px] text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:w-4/5"
                      />
                    </>
                  )}
                  {rating >= 4 && (
                    <>
                      <p className="mb-2 text-lg">
                        감사합니다! 동아리 활동에 대한 피드백을 작성해주세요. (설문조사 데이터는 전부 익명으로
                        전송됩니다)
                      </p>
                      <textarea
                        {...register('feedback')}
                        placeholder="여기에 의견을 작성해주세요."
                        rows={6}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-[16px] text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:w-4/5"
                      />
                    </>
                  )}
                  {rating > 0 && (
                    <button
                      type="submit"
                      className="group relative mb-2 me-2 mt-3 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800"
                    >
                      <span className="relative rounded-md bg-white px-3 py-2 text-[16px] transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                        제출하기
                      </span>
                    </button>
                  )}
                </form>
              </div>
            )}
            {userRated && <h3 className="mt-5 text-center text-lg font-medium">제출되었습니다. 감사합니다.</h3>}
          </div>
        </section>
      </main>
    </>
  )
}
