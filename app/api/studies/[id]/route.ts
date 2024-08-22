import { NextRequest } from 'next/server'

import { InternalServerError, NotFound } from '@/lib/response/errors'
import { NoIdProvided } from '@/lib/response/errors'
import { supabase } from '@/lib/supabase/client'

import { constructServerResponse } from '../../../../lib/response'
import { api } from '../../utils/factory'
import { HttpStatusCode } from '../../utils/httpConsts'

const GET = async (req: NextRequest) => {
  const { pathname } = req.nextUrl
  const id = pathname.split('/').pop()
  if (!id) {
    return constructServerResponse({
      error: NoIdProvided,
      data: null
    })
  }

  const res = await supabase.from('study').select('*, mentor ( * )').eq('id', id).single()

  if (res.error) {
    if (res.status === HttpStatusCode.NotAcceptable) {
      return constructServerResponse({
        error: NotFound,
        data: null
      })
    }
    return constructServerResponse({
      error: InternalServerError,
      data: null
    })
  }
  return constructServerResponse({
    error: null,
    data: res.data
  })
}
const PUT = api.PutFactory('study')
const PATCH = api.PatchFactory('study')
const DELETE = api.DeleteFactory('study')
export { DELETE, GET, PATCH, PUT }
