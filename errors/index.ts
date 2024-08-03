/**
 * 이 앱의 기본 에러 클래스 입니다.
 * 이를 직접적으로 사용하는 것보다는 상속된 자식 에러 클래스를 사용하는 것이 권장됩니다.
 */
export class BaseError extends Error {}
export class NotImplementedError extends BaseError {}

export class ClientError extends BaseError {}
export class FetchError extends ClientError {}
