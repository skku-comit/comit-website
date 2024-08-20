/**
 * ServerResponse.errorType에 할당될 수 있는
 * 값들과 그 값들을 쉽게 불러올 수 있도록 구조화 해서 제공합니다.
 * 서버뿐만 아니라 클라이언트에서도 해당 에러를 이용하는 것이 권장됩니다.
 */
type StandardHttpErrorType =
  | 'BadRequest'
  | 'UnAuthorized'
  | 'Forbidden'
  | 'NotFound'
  | 'MethodNotAllowed'
  | 'NotAcceptable'
  | 'IamAteapot'
  | 'InternalServerError'
  | 'NotImplemented'
export type ServerErrorType =
  | StandardHttpErrorType
  | 'StudySignup/AlreadySignedup'
  | 'StudySignup/EnrollmentPeriodExceeded'

interface IServerErrorType {
  standard: Standard
  StudySignup: StudySignup
}

interface Standard {
  BadRequest: ServerErrorType
  UnAuthorized: ServerErrorType
  Forbidden: ServerErrorType
  NotFound: ServerErrorType
  MethodNotAllowed: ServerErrorType
  NotAcceptable: ServerErrorType
  IamAteapot: ServerErrorType
  InternalServerError: ServerErrorType
  NotImplemented: ServerErrorType
}

interface StudySignup {
  Enrollment: {
    AlreadySignedup: ServerErrorType
    PeriodExceeded: ServerErrorType
  }
}

export const ServerErrorType: IServerErrorType = {
  standard: {
    BadRequest: 'BadRequest',
    UnAuthorized: 'UnAuthorized',
    Forbidden: 'Forbidden',
    NotFound: 'NotFound',
    MethodNotAllowed: 'MethodNotAllowed',
    NotAcceptable: 'NotAcceptable',
    IamAteapot: 'IamAteapot',
    InternalServerError: 'InternalServerError',
    NotImplemented: 'NotImplemented'
  },
  StudySignup: {
    Enrollment: {
      AlreadySignedup: 'StudySignup/AlreadySignedup',
      PeriodExceeded: 'StudySignup/EnrollmentPeriodExceeded'
    }
  }
}
