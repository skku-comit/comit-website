/**
 * Whenever someone needs to reference new status code,
 * please add here
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */
export enum HttpStatusCode {
  OK = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  UnAuthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  IamAteapot = 418,
  InternalServerError = 500,
  NotImplemented = 501
}

/**
 * This class standardizes the error object returned from server
 * ensuring clients receive object with same fields
 * which follows RFC 7807(https://datatracker.ietf.org/doc/html/rfc7807).
 * See more info from https://pjh3749.tistory.com/273
 */
export abstract class ServerError {
  public abstract errorType: string // We can specify our custom error type here
  public abstract status: HttpStatusCode // Follows HTTP status code

  constructor(
    public title: string | null = null,
    public detail: string | null = null,
    public instance: string | null = null
  ) {}

  toObject() {
    return {
      type: this.errorType,
      title: this.title ?? '',
      status: this.status ?? '',
      detail: this.detail ?? '',
      instance: this.instance ?? ''
    }
  }
}

// Successful responses(200 ~ )
export class OK extends ServerError {
  errorType = 'OK'
  status = HttpStatusCode.OK
}
export class Created extends ServerError {
  errorType = 'Created'
  status = HttpStatusCode.Created
}
export class NoContent extends ServerError {
  errorType = 'NoContent'
  status = HttpStatusCode.NoContent
}

// Client error responses(400 ~ )
export class BadRequest extends ServerError {
  errorType = 'BadRequest'
  status = HttpStatusCode.BadRequest
}
export class UnAuthorized extends ServerError {
  errorType = 'UnAuthorized'
  status = HttpStatusCode.UnAuthorized
}
export class Forbidden extends ServerError {
  errorType = 'Forbidden'
  status = HttpStatusCode.Forbidden
}
export class NotFound extends ServerError {
  errorType = 'Not Found'
  status = HttpStatusCode.NotFound
}
export class MethodNotAllowed extends ServerError {
  errorType = 'Method Not Allowed'
  status = HttpStatusCode.MethodNotAllowed
}
export class IamAteapot extends ServerError {
  errorType = "I'm a tea pot"
  status = HttpStatusCode.IamAteapot
}

// Server error responses(500 ~ )
export class InternalServerError extends ServerError {
  errorType = 'Internal Server Error'
  status = HttpStatusCode.InternalServerError
}
export class NotImplemented extends ServerError {
  errorType = 'NotImplemented'
  status = HttpStatusCode.NotImplemented
}
