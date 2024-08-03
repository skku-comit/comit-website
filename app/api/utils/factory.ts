import { NextRequest, NextResponse } from 'next/server'

import BaseEntity from '@/types'

import httpError from '../errors/standardHttpErrors'
import { HttpStatusCode } from './httpConsts'

function CreateFactory<E extends BaseEntity>() {
  return async (req: NextRequest) => {
    try {
      const entityCreated = req.body
      return NextResponse.json(entityCreated, { status: HttpStatusCode.Created })
    } catch (error) {
      return NextResponse.json(httpError.InternalServerError, { status: httpError.InternalServerError.status })
    }
  }
}

function RetrieveFactory<E extends BaseEntity>(entities: E[]) {
  return (req: NextRequest) => {
    try {
      const { pathname } = req.nextUrl
      const id = pathname.split('/').pop()

      const entityFound = entities.find((instance) => instance.id === id)

      if (!entityFound) {
        return NextResponse.json(httpError.NotFound, { status: httpError.NotFound.status })
      }
      return NextResponse.json(entityFound)
    } catch (error) {
      return NextResponse.json(httpError.InternalServerError, { status: httpError.InternalServerError.status })
    }
  }
}

function ListFactory<E extends BaseEntity>(entities: E[]) {
  return (req: NextRequest) => {
    try {
      let searchResult = entities.slice()
      const url = new URL(req.url!)

      const queryParams = url.searchParams
      queryParams.forEach((key, value) => {
        searchResult = searchResult.filter((entity) => {
          // Entity가 queryParam을 속성으로 가지면 필터
          if (Object.hasOwn(entity, value)) {
            let queryKey = value as keyof E
            return entity[queryKey] === key
          }
        })
      })

      return NextResponse.json(searchResult)
    } catch (error) {
      return NextResponse.json(httpError.InternalServerError, { status: httpError.InternalServerError.status })
    }
  }
}

function PutFactory<E extends BaseEntity>(entities: E[]) {
  return async (req: NextRequest) => {
    try {
      const { pathname } = req.nextUrl
      const id = pathname.split('/').pop()

      const entityFound = entities.find((instance) => instance.id === id)

      if (!entityFound) {
        return NextResponse.json(httpError.NotFound, { status: httpError.NotFound.status })
      }

      const entityUpdated = req.body
      return NextResponse.json(entityUpdated)
    } catch (error) {
      return NextResponse.json(httpError.InternalServerError, { status: httpError.InternalServerError.status })
    }
  }
}

function PatchFactory<E extends BaseEntity>(entities: E[]) {
  return async (req: NextRequest) => {
    try {
      const { pathname } = req.nextUrl
      const id = pathname.split('/').pop()

      const entityFound = entities.find((instance) => instance.id === id)

      if (!entityFound) {
        return NextResponse.json(httpError.NotFound, { status: httpError.NotFound.status })
      }

      const entityUpdated = req.body
      return NextResponse.json(entityUpdated)
    } catch (error) {
      return NextResponse.json(httpError.InternalServerError, { status: httpError.InternalServerError.status })
    }
  }
}

function DeleteFactory<E extends BaseEntity>(entities: E[]) {
  return async (req: NextRequest) => {
    try {
      const { pathname } = req.nextUrl
      const id = pathname.split('/').pop()

      const entityFound = entities.find((instance) => instance.id === id)

      if (!entityFound) {
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
