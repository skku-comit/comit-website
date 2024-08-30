'use client'

import { ErrorProps } from 'next/error'

const ErrorPage = ({ statusCode }: ErrorProps) => {
  return (
    <div>
      <h1>{statusCode ? `An error ${statusCode} occurred` : 'An error occurred'}</h1>
      <p>문제가 발생했습니다. 다시 시도해 주세요.</p>
    </div>
  )
}

export default ErrorPage
