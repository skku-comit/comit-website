import { NextResponse } from 'next/server'

import { NotImplementedError } from '@/errors'
import BaseEntity from '@/types'

export function ReturnObjectAsJsonOr404(obj: any): NextResponse {
  if (obj) {
    return NextResponse.json(obj)
  } else {
    return NextResponse.json({ error: 'Instance not found' }, { status: 404 })
  }
}

function CreateFactory<E extends BaseEntity>() {
  return (request: Request, { params }: { params: { id: string } }) => {
    throw new NotImplementedError()
  }
}

function RetrieveFactory<E extends BaseEntity>(entities: E[]) {
  return (request: Request, { params }: { params: { id: string } }) => {
    return ReturnObjectAsJsonOr404(
      entities.find((instance) => instance.id === instance.id)
    )
  }
}

function ListFactory<E extends BaseEntity>(entities: E[]) {
  return (request: Request, { params }: { params: { id: string } }) => {
    let searchResult = entities.slice()

    const url = new URL(request.url)
    const queryParams = url.searchParams
    queryParams.forEach((key, value) => {
      searchResult = searchResult.filter((entity) => {
        // Entity가 queryParam을 속성으로 가지면 필터
        if (Object.hasOwn(entity, value)) {
          let queryKey = value as keyof E
          return entity[queryKey] === queryParams.get(value)
        }
      })
    })

    return NextResponse.json(searchResult)
  }
}

function UpdateFactory<E extends BaseEntity>() {
  return (request: Request, { params }: { params: { id: string } }) => {
    throw new NotImplementedError()
  }
}

function DeleteFactory<E extends BaseEntity>() {
  return (request: Request, { params }: { params: { id: string } }) => {
    throw new NotImplementedError()
  }
}

/**
 * 반복적으로 작성되는 CRUD 패턴 스캐폴딩을 돕습니다.
 */
const api = {
  CreateFactory,
  RetrieveFactory,
  ListFactory,
  UpdateFactory,
  DeleteFactory
}
export { api }
