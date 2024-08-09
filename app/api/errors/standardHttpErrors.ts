import { HttpStatusCode } from '../utils/httpConsts'
import { ServerError } from '../utils/response'

// Client error responses(400 ~ )
const BadRequest: ServerError = {
  errorType: 'BadRequest',
  status: HttpStatusCode.BadRequest
}
const UnAuthorized: ServerError = {
  errorType: 'UnAuthorized',
  status: HttpStatusCode.UnAuthorized
}
const Forbidden: ServerError = {
  errorType: 'Forbidden',
  status: HttpStatusCode.Forbidden
}
const NotFound: ServerError = {
  errorType: 'Not Found',
  status: HttpStatusCode.NotFound
}
const MethodNotAllowed: ServerError = {
  errorType: 'Method Not Allowed',
  status: HttpStatusCode.MethodNotAllowed
}
const NotAcceptable: ServerError = {
  errorType: 'Not Acceptable',
  status: HttpStatusCode.NotAcceptable
}
const IamAteapot: ServerError = {
  errorType: "I'm a tea pot",
  status: HttpStatusCode.IamAteapot
}

// Server error responses(500 ~ )
const InternalServerError: ServerError = {
  errorType: 'Internal Server Error',
  status: HttpStatusCode.InternalServerError
}
const NotImplemented: ServerError = {
  errorType: 'NotImplemented',
  status: HttpStatusCode.NotImplemented
}

const httpError = {
  BadRequest,
  UnAuthorized,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  NotAcceptable,
  IamAteapot,
  InternalServerError,
  NotImplemented
}

export default httpError
