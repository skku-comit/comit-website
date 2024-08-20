import { NextRequest } from 'next/server'

import { HttpStatusCode } from '@/app/api/utils/httpConsts'
import { constructServerResponse } from '@/app/api/utils/response'
import { StudySignupRequest } from '@/components/study/signup/StudySignupForm'
import { Database } from '@/database.types'
import { AlreadySignedup } from '@/lib/errors/customErrors'
import { InternalServerError } from '@/lib/errors/standardHttpErrors'
import { supabase } from '@/lib/supabase/client'

const POST = async (req: NextRequest) => {
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
    // HTTP 409(Conflict): Primary Key(study_id + profile_id 조합)가 이미 존재할 때 발생
    if (res.status === HttpStatusCode.Conflict) {
      return constructServerResponse({
        error: AlreadySignedup,
        data: res.data
      })
    }

    return constructServerResponse({
      error: InternalServerError,
      data: null
    })
  }
  return constructServerResponse(res)
}

export { POST }
