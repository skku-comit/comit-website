import React from 'react'

import Main from '@/components/main/Main'
import { API_ENDPOINTS } from '@/constants/apiEndpoint'
import { fetchData } from '@/lib/fetch'
import { Study } from '@/types/Study'

const Home = async (): Promise<React.JSX.Element> => {
  const studyList: Study[] = await fetchData(API_ENDPOINTS.STUDY.LIST)
  return <Main studyList={studyList} />
}

export default Home
