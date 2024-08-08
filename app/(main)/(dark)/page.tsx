import React from 'react'

import Main from '@/components/main/Main'
import { fetchData } from '@/lib/fetch'
import { ROUTES } from '@/types/URL'

const Home = async (): Promise<React.JSX.Element> => {
  const res = await fetchData(ROUTES.STUDY.LIST)
  const studyList = res.data
  return <Main studyList={studyList} />
}

export default Home
