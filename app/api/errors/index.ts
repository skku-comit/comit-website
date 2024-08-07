import { HttpStatusCode } from '../utils/httpConsts'

/**
 * This class standardizes the error object returned from server
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
