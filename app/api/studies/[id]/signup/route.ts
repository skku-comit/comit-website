import { NextRequest } from 'next/server'

import { AlreadySignedup } from '@/app/api/errors/customErrors'
import { HttpStatusCode } from '@/app/api/utils/httpConsts'
import { getNextResponse } from '@/app/api/utils/response'
import { StudySignupRequest } from '@/components/study/signup/StudySignupForm'
import { Database } from '@/database.types'
import { supabase } from '@/lib/supabase/client'

const POST = async (req: NextRequest) => {
  try {
    const data: StudySignupRequest = await req.json()
    type InsertType = Database['public']['Tables']['study-participants']['Insert']
    // TODO: user id는 헤더에서 받기
    const TEST_USER_ID = 'b5851320-d374-4763-a7d5-70427602c19b' // 손장수
    const inputData: InsertType = {
      study_id: data.study_id,
      profile_id: TEST_USER_ID,
      applicationMotiv: data.applicationMotiv
    }

    const res = await supabase.from('study-participants').insert(inputData).select('*').single()

    if (res.error) {
      // HTTP 409(Conflict): When supabase has same primary key(study_id + profile_id combination)
      if (res.status === HttpStatusCode.Conflict) {
        console.log(res)
        return getNextResponse({
          error: AlreadySignedup,
          data: res.data,
          count: res.count,
          status: AlreadySignedup.status,
          statusText: 'Duplicated study signup'
        })
      }

      return getNextResponse({
        error: {
          errorType: `/study-signup`,
          status: res.status,
          title: res.error.message,
          detail: res.error.details,
          instance: `/study/${data.study_id}`
        },
        data: res.data,
        count: res.data,
        status: res.status,
        statusText: res.statusText
      })
    }
    return getNextResponse(res)
  } catch (error) {
    return getNextResponse({
      error: {
        errorType: `/study-signup`,
        status: HttpStatusCode.InternalServerError,
        title: 'Internal Server Error',
        instance: `/study`
      },
      data: null,
      count: null,
      status: HttpStatusCode.InternalServerError,
      statusText: 'Internal Server Error'
    })
  }
}

export { POST }
