import { NextRequest, NextResponse } from 'next/server'

import { Database } from '@/database.types'
import { supabase } from '@/lib/supabase/client'

import httpError from '../errors/standardHttpErrors'
import { HttpStatusCode } from './httpConsts'

type TableName = keyof Database['public']['Tables']
type EntityTypeWithoutId = Omit<Database['public']['Tables'][TableName]['Row'], 'id'>

function CreateFactory(relation: TableName) {
  return async (req: NextRequest, data: Database['public']['Tables'][TableName]['Row']) => {
    try {
      let created = await supabase.from(relation).insert(data).select('*')

      return NextResponse.json(created.data)
    } catch (error) {
      return NextResponse.json(httpError.InternalServerError, { status: httpError.InternalServerError.status })
    }
  }
}

function RetrieveFactory(relation: TableName) {
  return async (req: NextRequest) => {
    try {
      const { pathname } = req.nextUrl
      const id = pathname.split('/').pop()
      if (!id) {
        return NextResponse.json(httpError.BadRequest, { status: httpError.BadRequest.status })
      }

      let searchResult = await supabase.from(relation).select('*').eq('id', id)

      if (!searchResult) {
        return NextResponse.json(httpError.NotFound, { status: httpError.NotFound.status })
      }
      return NextResponse.json(searchResult.data)
    } catch (error) {
      return NextResponse.json(httpError.InternalServerError, { status: httpError.InternalServerError.status })
    }
  }
}

function ListFactory(relation: TableName) {
  return async (req: NextRequest) => {
    try {
      let searchResult = await supabase.from(relation).select('*')

      return NextResponse.json(searchResult.data)
    } catch (error) {
      return NextResponse.json(httpError.InternalServerError, { status: httpError.InternalServerError.status })
    }
  }
}

function PutFactory(relation: TableName) {
  return async (req: NextRequest, data: EntityTypeWithoutId) => {
    try {
      const { pathname } = req.nextUrl
      const id = pathname.split('/').pop()
      if (!id) {
        return NextResponse.json(httpError.BadRequest, { status: httpError.BadRequest.status })
      }

      let searchResult = await supabase.from(relation).update(data).eq('id', id)

      if (!searchResult) {
        return NextResponse.json(httpError.NotFound, { status: httpError.NotFound.status })
      }
      return NextResponse.json(searchResult.data)
    } catch (error) {
      return NextResponse.json(httpError.InternalServerError, { status: httpError.InternalServerError.status })
    }
  }
}

function PatchFactory(relation: TableName) {
  return async (req: NextRequest, key: string, value: string) => {
    try {
      const { pathname } = req.nextUrl
      const id = pathname.split('/').pop()
      if (!id) {
        return NextResponse.json(httpError.BadRequest, { status: httpError.BadRequest.status })
      }

      let searchResult = await supabase
        .from(relation)
        .update({ [(key = key)]: value })
        .eq('id', id)

      if (!searchResult) {
        return NextResponse.json(httpError.NotFound, { status: httpError.NotFound.status })
      }
      return NextResponse.json(searchResult.data)
    } catch (error) {
      return NextResponse.json(httpError.InternalServerError, { status: httpError.InternalServerError.status })
    }
  }
}

function DeleteFactory(relation: TableName) {
  return async (req: NextRequest) => {
    try {
      const { pathname } = req.nextUrl
      const id = pathname.split('/').pop()
      if (!id) {
        return NextResponse.json(httpError.BadRequest, { status: httpError.BadRequest.status })
      }

      let deleted = await supabase.from(relation).delete().eq('id', id)

      if (!deleted) {
        return NextResponse.json(httpError.NotFound, { status: httpError.NotFound.status })
      }

      return NextResponse.json(null, { status: HttpStatusCode.NoContent })
    } catch (error) {
      return NextResponse.json(httpError.InternalServerError, { status: httpError.InternalServerError.status })
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
