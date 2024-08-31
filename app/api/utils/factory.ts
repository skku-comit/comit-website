import { NextRequest, NextResponse } from 'next/server'

import { Database } from '@/database.types'
import { NoIdProvided } from '@/lib/response/errors'
import { supabase } from '@/lib/supabase/client'
import { createSupabaseErrorResponse } from '@/lib/supabase/utils'

import { constructServerResponse } from '../../../lib/response'

type TableName = keyof Database['public']['Tables']

function CreateFactory(relation: TableName) {
  return async (req: NextRequest): Promise<NextResponse> => {
    type supabaseInsertType = Database['public']['Tables'][TableName]['Insert']
    const inputData: supabaseInsertType = await req.json()
    const res = await supabase.from(relation).insert(inputData).select('*').single()

    if (res.error) return createSupabaseErrorResponse(res)
    return constructServerResponse({
      error: null,
      data: res.data
    })
  }
}

function RetrieveFactory(relation: TableName) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const { pathname } = req.nextUrl
    const id = pathname.split('/').pop()
    if (!id) {
      return constructServerResponse({
        error: NoIdProvided,
        data: null
      })
    }

    const res = await supabase.from(relation).select('*').eq('id', id).single()

    if (res.error) return createSupabaseErrorResponse(res)
    return constructServerResponse({
      error: null,
      data: res.data
    })
  }
}

function ListFactory(relation: TableName) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const res = await supabase.from(relation).select('*')

    if (res.error) return createSupabaseErrorResponse(res)
    return constructServerResponse({
      error: null,
      data: res.data
    })
  }
}

function PutFactory(relation: TableName) {
  return async (req: NextRequest): Promise<NextResponse> => {
    type supabaseUpdateType = Database['public']['Tables'][TableName]['Update']
    const inputData: supabaseUpdateType = await req.json()

    const { pathname } = req.nextUrl
    const id = pathname.split('/').pop()
    if (!id) {
      return constructServerResponse({
        error: NoIdProvided,
        data: null
      })
    }

    const res = await supabase.from(relation).update(inputData).eq('id', id).single()

    if (res.error) return createSupabaseErrorResponse(res)
    return constructServerResponse({
      error: null,
      data: res.data
    })
  }
}

function PatchFactory(relation: TableName) {
  return async (req: NextRequest): Promise<NextResponse> => {
    type supabaseUpdateType = Database['public']['Tables'][TableName]['Update']
    const inputData: supabaseUpdateType = await req.json()

    const { pathname } = req.nextUrl
    const id = pathname.split('/').pop()
    if (!id) {
      return constructServerResponse({
        error: NoIdProvided,
        data: null
      })
    }

    const res = await supabase.from(relation).update(inputData).eq('id', id).single()

    if (res.error) return createSupabaseErrorResponse(res)
    return constructServerResponse({
      error: null,
      data: res.data
    })
  }
}

function DeleteFactory(relation: TableName) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const { pathname } = req.nextUrl
    const id = pathname.split('/').pop()
    if (!id) {
      return constructServerResponse({
        error: NoIdProvided,
        data: null
      })
    }

    const res = await supabase.from(relation).delete().eq('id', id).single()

    if (res.error) return createSupabaseErrorResponse(res)
    return constructServerResponse({
      error: null,
      data: res.data
    })
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
