import { NextRequest } from 'next/server'

import { Database } from '@/database.types'
import { supabase } from '@/lib/supabase/client'

import { HttpStatusCode } from './httpConsts'
import { getNextResponse, ServerResponse } from './response'

type TableName = keyof Database['public']['Tables']

function CreateFactory(relation: TableName) {
  return async (req: NextRequest) => {
    try {
      const inputData: Database['public']['Tables'][TableName]['Insert'] = await req.json()
      const res = await supabase.from(relation).insert(inputData).select('*').single()

      if (res.error) {
        const customErrorResponse: ServerResponse = {
          error: {
            errorType: `/${relation}-create`,
            status: res.status,
            title: res.error.message,
            detail: res.error.details,
            instance: `/${relation}`
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
          errorType: `/${relation}-create`,
          status: HttpStatusCode.InternalServerError,
          title: 'Internal Server Error',
          instance: `/${relation}`
        },
        data: null,
        count: null,
        status: HttpStatusCode.InternalServerError,
        statusText: 'Internal Server Error'
      })
    }
  }
}

function RetrieveFactory(relation: TableName) {
  return async (req: NextRequest) => {
    try {
      const { pathname } = req.nextUrl
      const id = pathname.split('/').pop()
      if (!id) {
        const customErrorResponse: ServerResponse = {
          error: {
            errorType: `/${relation}-retrieve`,
            status: HttpStatusCode.BadRequest,
            title: 'No id was given',
            detail: 'No id was given. Please specify the id.',
            instance: `/${relation}`
          },
          data: null,
          count: null,
          status: HttpStatusCode.BadRequest,
          statusText: 'Bad Request'
        }
        return getNextResponse(customErrorResponse)
      }

      const res = await supabase.from(relation).select('*').eq('id', id).single()

      if (res.error) {
        // Supabase will return 406(Not Acceptable) error if the result is not a single JSON object
        if (res.status === HttpStatusCode.NotAcceptable) {
          const customErrorResponse: ServerResponse = {
            error: {
              errorType: `/${relation}-retrieve`,
              status: HttpStatusCode.NotFound,
              title: res.error.message,
              detail: res.error.details,
              instance: `/${relation}/${id}`
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
            errorType: `/${relation}-retrieve`,
            status: res.status,
            title: res.error.message,
            detail: res.error.details,
            instance: `/${relation}/${id}`
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
          errorType: `/${relation}-retrieve`,
          status: HttpStatusCode.InternalServerError,
          title: 'Internal Server Error',
          instance: `/${relation}`
        },
        data: null,
        count: null,
        status: HttpStatusCode.InternalServerError,
        statusText: 'Internal Server Error'
      })
    }
  }
}

function ListFactory(relation: TableName) {
  return async (req: NextRequest) => {
    try {
      const res = await supabase.from(relation).select('*')

      if (res.error) {
        const customErrorResponse: ServerResponse = {
          error: {
            errorType: `/${relation}-list`,
            status: res.status,
            title: res.error.message,
            detail: res.error.details,
            instance: `/${relation}`
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
          errorType: `/${relation}-list`,
          status: HttpStatusCode.InternalServerError,
          title: 'Internal Server Error',
          instance: `/${relation}`
        },
        data: null,
        count: null,
        status: HttpStatusCode.InternalServerError,
        statusText: 'Internal Server Error'
      })
    }
  }
}

function PutFactory(relation: TableName) {
  return async (req: NextRequest) => {
    try {
      const inputData: Database['public']['Tables'][TableName]['Update'] = await req.json()

      const { pathname } = req.nextUrl
      const id = pathname.split('/').pop()
      if (!id) {
        const customErrorResponse: ServerResponse = {
          error: {
            errorType: `/${relation}-put`,
            status: HttpStatusCode.BadRequest,
            title: 'No id was given',
            detail: 'No id was given. Please specify the id.',
            instance: `/${relation}`
          },
          data: null,
          count: null,
          status: HttpStatusCode.BadRequest,
          statusText: 'Bad Request'
        }
        return getNextResponse(customErrorResponse)
      }

      const res = await supabase.from(relation).update(inputData).eq('id', id).single()

      if (res.error) {
        // Supabase will return 406(Not Acceptable) error if the result is not a single JSON object
        if (res.status === HttpStatusCode.NotAcceptable) {
          const customErrorResponse: ServerResponse = {
            error: {
              errorType: `/${relation}-put`,
              status: HttpStatusCode.NotFound,
              title: res.error.message,
              detail: res.error.details,
              instance: `/${relation}/${id}`
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
            errorType: `/${relation}-put`,
            status: res.status,
            title: res.error.message,
            detail: res.error.details,
            instance: `/${relation}/${id}`
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
          errorType: `/${relation}-put`,
          status: HttpStatusCode.InternalServerError,
          title: 'Internal Server Error',
          instance: `/${relation}`
        },
        data: null,
        count: null,
        status: HttpStatusCode.InternalServerError,
        statusText: 'Internal Server Error'
      })
    }
  }
}

function PatchFactory(relation: TableName) {
  return async (req: NextRequest) => {
    try {
      const inputData: Database['public']['Tables'][TableName]['Update'] = await req.json()

      const { pathname } = req.nextUrl
      const id = pathname.split('/').pop()
      if (!id) {
        const customErrorResponse: ServerResponse = {
          error: {
            errorType: `/${relation}-patch`,
            status: HttpStatusCode.BadRequest,
            title: 'No id was given',
            detail: 'No id was given. Please specify the id.',
            instance: `/${relation}`
          },
          data: null,
          count: null,
          status: HttpStatusCode.BadRequest,
          statusText: 'Bad Request'
        }
        return getNextResponse(customErrorResponse)
      }

      const res = await supabase.from(relation).update(inputData).eq('id', id).single()

      if (res.error) {
        // Supabase will return 406(Not Acceptable) error if the result is not a single JSON object
        if (res.status === HttpStatusCode.NotAcceptable) {
          const customErrorResponse: ServerResponse = {
            error: {
              errorType: `/${relation}-patch`,
              status: HttpStatusCode.NotFound,
              title: res.error.message,
              detail: res.error.details,
              instance: `/${relation}/${id}`
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
            errorType: `/${relation}-patch`,
            status: res.status,
            title: res.error.message,
            detail: res.error.details,
            instance: `/${relation}/${id}`
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
          errorType: `/${relation}-patch`,
          status: HttpStatusCode.InternalServerError,
          title: 'Internal Server Error',
          instance: `/${relation}`
        },
        data: null,
        count: null,
        status: HttpStatusCode.InternalServerError,
        statusText: 'Internal Server Error'
      })
    }
  }
}

function DeleteFactory(relation: TableName) {
  return async (req: NextRequest) => {
    try {
      const { pathname } = req.nextUrl
      const id = pathname.split('/').pop()
      if (!id) {
        const customErrorResponse: ServerResponse = {
          error: {
            errorType: `/${relation}-delete`,
            status: HttpStatusCode.BadRequest,
            title: 'No id was given',
            detail: 'No id was given. Please specify the id.',
            instance: `/${relation}`
          },
          data: null,
          count: null,
          status: HttpStatusCode.BadRequest,
          statusText: 'Bad Request'
        }
        return getNextResponse(customErrorResponse)
      }

      const res = await supabase.from(relation).delete().eq('id', id).single()

      if (res.error) {
        // Supabase will return 406(Not Acceptable) error if the result is not a single JSON object
        if (res.status === HttpStatusCode.NotAcceptable) {
          const customErrorResponse: ServerResponse = {
            error: {
              errorType: `/${relation}-delete`,
              status: HttpStatusCode.NotFound,
              title: res.error.message,
              detail: res.error.details,
              instance: `/${relation}/${id}`
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
            errorType: `/${relation}-delete`,
            status: res.status,
            title: res.error.message,
            detail: res.error.details,
            instance: `/${relation}/${id}`
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
          errorType: `/${relation}-retrieve`,
          status: HttpStatusCode.InternalServerError,
          title: 'Internal Server Error',
          instance: `/${relation}`
        },
        data: null,
        count: null,
        status: HttpStatusCode.InternalServerError,
        statusText: 'Internal Server Error'
      })
    }
  }
}

/**
 * 반복적으로 작성되는 CRUD 패턴 스캐폴딩을 돕습니다.
 */
const api = {
  CreateFactory,
  RetrieveFactory,
  ListFactory,
  PutFactory,
  PatchFactory,
  DeleteFactory
}
export { api }
