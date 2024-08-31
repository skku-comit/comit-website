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
