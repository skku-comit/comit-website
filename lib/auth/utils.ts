import { HttpStatusCode } from '@/app/api/utils/httpConsts'
import { API_ENDPOINTS, ApiEndpoint } from '@/constants/apiEndpoint'
import { fetchData } from '@/lib/fetch'
import { CustomResponseDTO } from '@/lib/response'
import { User } from '@/types'

export interface Credentials {
  email: string
  password: string
}

export async function getUserInitialDataWithCredentials({ email, password }: Credentials) {
  const res = await fetchData(API_ENDPOINTS.AUTH.LOGIN as ApiEndpoint, {
    body: JSON.stringify({ email, password })
  })
  const data = (await res.json()) as CustomResponseDTO
  if (!res.ok) {
    switch (res.status) {
      case HttpStatusCode.UnAuthorized:
        return null
      default:
        throw new Error(`Unhandled Error: ${data.error?.errorType} ${data.error?.detail}`)
    }
  }
  const user = data.data as User
  return { id: user.id, name: user.name }
}

export async function getFullUserDataWithToken(accessToken: string): Promise<User> {
  const res = await fetchData(API_ENDPOINTS.PROFILE as ApiEndpoint, {
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  const data = (await res.json()) as CustomResponseDTO
  console.log(data)
  if (!res.ok) {
    throw new Error(`Unhandled Error: ${data.error?.errorType} ${data.error?.detail}`)
  }

  return data.data as User
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

  // isExpired: boolean  // 토큰이 만료되었는지 확인
  // isValid: boolean    // 파싱이 가능한 유효한 토큰인지 확인
  // expiresIn: number    // 만료까지 남은 시간
}

export function decodeToken(token: string) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}

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

  // parse(token: string) {
  //   const cookieParts = token.split(';').map(part => part.trim());

  //   // 쿠키 이름과 값을 추출
  //   const parsedCookie = {
  //     name: cookieParts[0].split('=')[0],
  //     value: cookieParts[0].split('=')[1],
  //     attributes: cookieParts.slice(1).map(attr => {
  //       return  {
  //         [attr.split('=')[0]]: attr.split('=')[1]
  //       }
  //     })
  //   }
  //   if (parsedCookie.name !== 'refresh') {
  //     throw new Error('Invalid cookie name: ' + parsedCookie.name)
  //   }
  //   return parsedCookie
  // }

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
