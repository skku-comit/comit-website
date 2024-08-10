import { NextRequest } from 'next/server'

import { supabase } from '@/lib/supabase/client'

import { api } from '../../utils/factory'
import { HttpStatusCode } from '../../utils/httpConsts'
import { getNextResponse, ServerResponse } from '../../utils/response'

const GET = async (req: NextRequest) => {
  try {
    const { pathname } = req.nextUrl
    const id = pathname.split('/').pop()
    if (!id) {
      const customErrorResponse: ServerResponse = {
        error: {
          errorType: `/study-retrieve`,
          status: HttpStatusCode.BadRequest,
          title: 'No id was given',
          detail: 'No id was given. Please specify the id.',
          instance: `/study`
        },
        data: null,
        count: null,
        status: HttpStatusCode.BadRequest,
        statusText: 'Bad Request'
      }
      return getNextResponse(customErrorResponse)
    }

    const res = await supabase.from('study').select('*, mentor ( * )').eq('id', id).single()

    if (res.error) {
      if (res.status === HttpStatusCode.NotAcceptable) {
        const customErrorResponse: ServerResponse = {
          error: {
            errorType: `/study-retrieve`,
            status: HttpStatusCode.NotFound,
            title: res.error.message,
            detail: res.error.details,
            instance: `/study/${id}`
          },
          data: res.data,
          count: res.data,
          status: HttpStatusCode.NotFound,
          statusText: res.statusText
        }
        return getNextResponse(customErrorResponse)
      }

      const customErrorResponse: ServerResponse = {
        error: {
          errorType: `/study-retrieve`,
          status: res.status,
          title: res.error.message,
          detail: res.error.details,
          instance: `/study/${id}`
        },
        data: res.data,
        count: res.data,
        status: res.status,
        statusText: res.statusText
      }
      return getNextResponse(customErrorResponse)
    }
    return getNextResponse(res)
  } catch (error) {
    return getNextResponse({
      error: {
        errorType: `/study-retrieve`,
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
const PUT = api.PutFactory('study')
const PATCH = api.PatchFactory('study')
const DELETE = api.DeleteFactory('study')
export { DELETE, GET, PATCH, PUT }
