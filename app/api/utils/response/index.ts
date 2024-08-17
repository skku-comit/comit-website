import { NextResponse } from 'next/server'

import { type ServerErrorType } from '../../errors/types'
import { HttpStatusCode } from '../httpConsts'

/**
 * 서버는 항상 해당 형태의 JSON을 전송합니다.
 * `error`의 타입이 `ServerErrorDTO`가 아니라 `ServerError`인 이유는
 * `getNextResponse`가 `status`와 `statusText`를 추출해서
 * `init`(2번째 인자)로 전달하여 데이터 중복을 최소화하기 때문입니다.
 */
export interface ServerResponse {
  error: ServerError | null
  data: any
}

export interface ServerResponseDTO {
  error: ServerErrorDTO | null
  data: any
}

/**
 * 서버 측에서 커스텀 에러를 정의할 때 사용되는 인터페이스입니다.
 */
export interface ServerError {
  errorType: ServerErrorType // 에러의 식별자, 즉 `ID` 입니다.
  status: HttpStatusCode // HTTP 상태 코드
  statusText?: string // HTTP 상태 코드에 대한 설명
  title?: string // 사람이 읽을 수 있는 간단한 에러에 대한 메세지
  detail?: string // 사람이 읽을 수 있는 에러에 대한 설명
}

/**
 * 클라이언트가 실제로 받을 에러 데이터 입니다.
 * `status`와 `statusText`는 `json` 변환 전
 * `response`에서 확인할 수 있기에 제외합니다.
 */
export type ServerErrorDTO = Omit<ServerError, 'status' | 'statusText'>

/**
 * NextResponse.json의 Wrapper 함수 입니다.
 * body에 ServerResponse의 타입만 들어가도록 합니다.
 */
export function constructServerResponse(body: ServerResponse, init?: ResponseInit): NextResponse {
  // error가 있고 init을 따로 지정하지 않을 시
  // ServerError를 ServerErrorDTO로 변환합니다.
  if (body.error && !init) {
    const newBody: ServerResponseDTO = {
      data: body.data,
      error: {
        errorType: body.error.errorType,
        title: body.error.title,
        detail: body.error.detail
      }
    }
    init = {
      status: body.error.status,
      statusText: body.error.statusText
    }
    return NextResponse.json(newBody, init)
  }
  return NextResponse.json(body, init)
}
