import { NextResponse } from 'next/server'

import { HttpStatusCode } from './httpConsts'

/**
 * 서버는 항상 해당 형태의 JSON을 전송합니다.
 */
export interface ServerResponse {
  error: ServerError | null
  data: any
  count: number | null
  status: HttpStatusCode
  statusText: string
}

/**
 * This interface standardizes the error object returned from server
 * ensuring clients receive object with same fields
 * which follows RFC 7807(https://datatracker.ietf.org/doc/html/rfc7807).
 * See more info from https://pjh3749.tistory.com/273
 */
export interface ServerError {
  errorType: string // 에러를 분류하기 위한 URI 식별자
  status: HttpStatusCode // HTTP 응답 코드
  title?: string // 사람이 읽을 수 있는 간단한 에러에 대한 메세지
  detail?: string // 사람이 읽을 수 있는 에러에 대한 설명
  instance?: string // 에러가 발생한 URI
}

/**
 * NextResponse.json의 Wrapper 함수 입니다.
 * body의 내용에 기반해 NextResponse.json의 두 번째 인자인
 * init을 자동으로 설정한 후 NextResponse를 반환합니다.
 */
export function getNextResponse(body: ServerResponse): NextResponse {
  return NextResponse.json(body, { status: body.status, statusText: body.statusText })
}
