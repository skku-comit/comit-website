import { HttpStatusCode } from '../../app/api/utils/httpConsts'
import { ServerError } from '../../app/api/utils/response'
import { ServerErrorType } from './types'

// Client error responses(400 ~ )
export const BadRequest: ServerError = {
  errorType: ServerErrorType.standard.BadRequest,
  status: HttpStatusCode.BadRequest
}
export const UnAuthorized: ServerError = {
  errorType: ServerErrorType.standard.UnAuthorized,
  status: HttpStatusCode.UnAuthorized
}
export const Forbidden: ServerError = {
  errorType: ServerErrorType.standard.Forbidden,
  status: HttpStatusCode.Forbidden
}
export const NotFound: ServerError = {
  errorType: ServerErrorType.standard.NotFound,
  status: HttpStatusCode.NotFound
}
export const MethodNotAllowed: ServerError = {
  errorType: ServerErrorType.standard.MethodNotAllowed,
  status: HttpStatusCode.MethodNotAllowed
}
export const NotAcceptable: ServerError = {
  errorType: ServerErrorType.standard.NotAcceptable,
  status: HttpStatusCode.NotAcceptable
}
export const IamAteapot: ServerError = {
  errorType: ServerErrorType.standard.IamAteapot,
  status: HttpStatusCode.IamAteapot
}

// Server error responses(500 ~ )
export const InternalServerError: ServerError = {
  errorType: ServerErrorType.standard.InternalServerError,
  status: HttpStatusCode.InternalServerError
}
export const NotImplemented: ServerError = {
  errorType: ServerErrorType.standard.NotImplemented,
  status: HttpStatusCode.NotImplemented
}
