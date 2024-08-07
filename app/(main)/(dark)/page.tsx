import React from 'react'

import Main from '@/components/main/Main'
import { fetchData } from '@/lib/fetch'
import { Study } from '@/types'
import { ROUTES } from '@/types/URL'

const Home = async (): Promise<React.JSX.Element> => {
  const studyList: Study[] = await fetchData(ROUTES.STUDY.LIST)
  return <Main studyList={studyList} />
}

export default Home
