import { HttpStatusCode } from '../utils/httpConsts'
import { ServerError } from '../utils/response'

export const EnrollmentPeriodExceeded: ServerError = {
  errorType: '',
  status: HttpStatusCode.BadRequest,
  title: '수강신청 기간 초과',
  detail: '현재는 수강신청 가능한 기간이 아닙니다. 관리자에게 문의하세요.'
}

export const AlreadySignedup: ServerError = {
  errorType: '/study-signup/alreadySignedup',
  status: HttpStatusCode.BadRequest,
  title: '중복된 수강신청',
  detail: '이미 신청되었습니다'
}
