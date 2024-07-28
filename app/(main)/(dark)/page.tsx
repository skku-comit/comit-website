import React from 'react'

import Main from '@/components/main/Main'
import { fetchDatas } from '@/lib/CRUD'
import { Study } from '@/types/Study'
import { Path } from '@/types/URL'

const Home = async (): Promise<React.JSX.Element> => {
  const studyList: Study[] = await fetchDatas('api/studies' as Path, 'Studies')
  return <Main studyList={studyList} />
}

export default Home
