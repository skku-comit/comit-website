/**
 * https://developer.mozilla.org/ko/docs/Web/HTTP/Methods
 */
export type HttpMethod = 'CREATE' | 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

/**
 * Whenever someone needs to reference new status code,
 * please add here
 * https://developer.mozilla.org/ko/docs/Web/HTTP/Status
 */
export enum HttpStatusCode {
  OK = 200,
  Created = 201,
  NoContent = 204,
  SeeOther = 303,
  BadRequest = 400,
  UnAuthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  Conflict = 409,
  IamAteapot = 418,
  InternalServerError = 500,
  NotImplemented = 501
}
