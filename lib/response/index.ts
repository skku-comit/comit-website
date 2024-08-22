import { NextResponse } from 'next/server'

import { HttpStatusCode } from '../../app/api/utils/httpConsts'

/**
 * 프론트, 백엔드가 공통적으로 사용하는 JSON의 구조 입니다.
 */
export interface CustomResponse {
  error: CustomError | null
  data: any
}

export interface CustomResponseDTO {
  error: CustomErrorDTO | null
  data: any
}

/**
 * 서버 측에서 커스텀 에러를 정의할 때 사용되는 인터페이스 입니다.
 */
export interface CustomError {
  errorType: string // 에러의 식별자, 즉 `ID` 입니다.
  status: HttpStatusCode // HTTP 상태 코드
  statusText?: string // HTTP 상태 코드에 대한 설명
  detail?: string // 사람이 읽을 수 있는 에러에 대한 설명
}

/**
 * 클라이언트가 실제로 받을 에러 데이터 입니다.
 * `status`와 `statusText`는 `json` 변환 전
 * `response`에서 확인할 수 있기에 제외합니다.
 */
export type CustomErrorDTO = Omit<CustomError, 'status' | 'statusText'>

/**
 * `NextResponse.json`의 Wrapper 함수 입니다.
 * 1. `body`에 `ServerResponse`의 타입만 들어가도록 함
 * 2. `init` 자동 작성
 */
export function constructServerResponse(body: CustomResponse, init?: ResponseInit): NextResponse {
  // error가 있고 init을 따로 지정하지 않을 시
  // ServerError를 ServerErrorDTO로 변환합니다.
  if (body.error && !init) {
    const newBody: CustomResponseDTO = {
      data: body.data,
      error: {
        errorType: body.error.errorType,
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
