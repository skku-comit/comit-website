import { API_ENDPOINTS, ApiEndpoint } from '@/constants/apiEndpoint'
import { fetchData } from '@/lib/fetch'

export interface Credentials {
  email: string
  password: string
}

export async function getAccessTokenWithRefreshToken(refreshToken: string): Promise<string> {
  const res = await fetchData(API_ENDPOINTS.AUTH.REISSUE as ApiEndpoint, {
    headers: {
      'Content-Type': 'application/json',
      Cookie: `refresh=${refreshToken}`
    }
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error)
  }

  console.log('New Access Token:', data.accessToken)
  return data.accessToken
}

interface Token {
  token: string
  subject: string
  issuedAt: number
  expiresAt: number
  maxAge?: number
  httpOnly?: boolean

  isExpired: boolean // 토큰이 만료되었는지 확인
  isValid: boolean // 파싱이 가능한 유효한 토큰인지 확인
  expiresIn: number // 만료까지 남은 시간
}

export function decodeToken(token: string) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}

/**
 * 액세스 토큰을 다루기 쉽게 해주는 클래스 입니다.
 * @warning 각 콜백 함수에서 받은 매개 변수는 쿠키에 저장될 때 타입을 잃어버림으로
 * 자동으로 이 클래스 인스턴스로 변환되지 않으니 반드시 직접 변환해야 합니다.
 * @example
 * ```ts
 * async function jwt({ token, user }: { token: JWT; user: User }): Promise<CustomToken> {
 *  console.log(token.accessToken instanceof AccessToken) // false
 *  token.accessToken = new AccessToken(token.accessToken.token)
 *  console.log(token.accessToken instanceof AccessToken) // true
 *  ...
 * }
 * ```
 */
export class AccessToken implements Token {
  public readonly token: string // 디코드 하기 전의 변형 되지 않은 토큰 값
  public readonly subject: string
  public readonly issuedAt: number
  public readonly expiresAt: number
  public readonly httpOnly: boolean
  private _isValid: boolean

  constructor(token: string) {
    this.token = token
    const { id, iat, exp } = decodeToken(token)
    this.subject = id
    this.issuedAt = iat
    this.expiresAt = exp

    this.httpOnly = false
    this._isValid = true
  }

  get isExpired(): boolean {
    const currentTime = Math.floor(Date.now() / 1000) // 현재 시간을 초 단위 Unix 타임스탬프로 변환
    return this.expiresAt < currentTime
  }

  get isValid(): boolean {
    return this._isValid
  }

  get expiresIn(): number {
    const currentTime = Math.floor(Date.now() / 1000) // 현재 시간을 초 단위 Unix 타임스탬프로 변환
    return this.expiresAt - currentTime
  }
}

export class RefreshToken implements Token {
  public readonly token: string // 디코드 하기 전의 변형 되지 않은 토큰 값
  public readonly subject: string
  public readonly issuedAt: number
  public readonly expiresAt: number
  public readonly maxAge?: number
  public readonly httpOnly?: boolean
  private _isValid: boolean = false

  constructor(token: string) {
    this.token = token
    const { id, iat, exp } = this.parseTokenPart(token)
    this.subject = id
    this.issuedAt = iat
    this.expiresAt = exp

    const { maxAge, expiresAt, httpOnly } = this.parseAttributes(token)
    this.maxAge = maxAge
    this.expiresAt = expiresAt
    this.httpOnly = httpOnly
    this._isValid = true
  }

  parseTokenPart(token: string) {
    return decodeToken(token.split(';')[0].split('=')[1])
  }

  parseAttributes(token: string) {
    const attributes = token.split(';').map((attr: string) => attr.trim())
    const maxAgeAttr = attributes.find((attr: string) => attr.startsWith('Max-Age='))
    const expiresAttr = attributes.find((attr: string) => attr.startsWith('Expires='))
    const httpOnlyAttr = attributes.find((attr: string) => attr.toLowerCase() === 'httponly')

    const maxAge = maxAgeAttr ? parseInt(maxAgeAttr.split('=')[1], 10) : undefined
    const expiresAtDate = expiresAttr ? new Date(expiresAttr.split('=')[1]) : undefined
    const httpOnly = !!httpOnlyAttr

    if (!expiresAtDate) {
      throw new Error('Invalid cookie: missing Expires attribute')
    }
    const expiresAtAsUnixTimestamp = Math.floor(expiresAtDate.getTime() / 1000)

    return { maxAge, expiresAt: expiresAtAsUnixTimestamp, httpOnly }
  }

  get isExpired(): boolean {
    const currentTime = Math.floor(Date.now() / 1000) // 현재 시간을 초 단위 Unix 타임스탬프로 변환
    return this.expiresAt < currentTime
  }

  get isValid(): boolean {
    return this._isValid
  }

  get expiresIn(): number {
    const currentTime = Math.floor(Date.now() / 1000) // 현재 시간을 초 단위 Unix 타임스탬프로 변환
    return this.expiresAt - currentTime
  }
}
