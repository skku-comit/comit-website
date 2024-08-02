import { HttpStatusCode, ServerError } from '.'

// Successful responses(200 ~ )
const OK: ServerError = {
  errorType: 'OK',
  status: HttpStatusCode.OK
}
const Created: ServerError = {
  errorType: 'Created',
  status: HttpStatusCode.Created
}
const NoContent: ServerError = {
  errorType: 'NoContent',
  status: HttpStatusCode.NoContent
}

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
  OK,
  Created,
  NoContent,
  BadRequest,
  UnAuthorized,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  IamAteapot,
  InternalServerError,
  NotImplemented
}

export default httpError
