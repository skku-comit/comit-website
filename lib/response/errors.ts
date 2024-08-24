import { HttpStatusCode } from '../../app/api/utils/httpConsts'
import { CustomError } from '../response'

// Client error responses(400 ~ )
export const BadRequest: CustomError = {
  errorType: 'BadRequest',
  status: HttpStatusCode.BadRequest
}
export const UnAuthorized: CustomError = {
  errorType: 'UnAuthorized',
  status: HttpStatusCode.UnAuthorized
}
export const Forbidden: CustomError = {
  errorType: 'Forbidden',
  status: HttpStatusCode.Forbidden
}
export const NotFound: CustomError = {
  errorType: 'NotFound',
  status: HttpStatusCode.NotFound
}
export const MethodNotAllowed: CustomError = {
  errorType: 'MethodNotAllowed',
  status: HttpStatusCode.MethodNotAllowed
}
export const NotAcceptable: CustomError = {
  errorType: 'NotAcceptable',
  status: HttpStatusCode.NotAcceptable
}
export const IamAteapot: CustomError = {
  errorType: 'IamAteapot',
  status: HttpStatusCode.IamAteapot
}

// Server error responses(500 ~ )
export const InternalServerError: CustomError = {
  errorType: 'InternalServerError',
  status: HttpStatusCode.InternalServerError
}
export const NotImplemented: CustomError = {
  errorType: 'NotImplemented',
  status: HttpStatusCode.NotImplemented
}

export const AlreadySignedup: CustomError = {
  errorType: 'StudySignup/AlreadySignedup',
  status: HttpStatusCode.BadRequest,
  detail: '이미 신청되었습니다'
}

export const EnrollmentPeriodExceeded: CustomError = {
  errorType: 'StudySignup/EnrollmentPeriodExceeded',
  status: HttpStatusCode.BadRequest,
  detail: '현재는 수강신청 가능한 기간이 아닙니다. 관리자에게 문의하세요.'
}

export const NoIdProvided: CustomError = {
  errorType: 'BadRequest',
  status: HttpStatusCode.BadRequest,
  detail: 'ID가 주어지지 않았습니다. 요청에 ID를 포함시켜 주세요'
}
