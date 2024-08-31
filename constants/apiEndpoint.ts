import { HttpMethod } from '@/app/api/utils/httpConsts'

const baseURL =
  process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_LOCAL_URL : process.env.NEXT_PUBLIC_DEPLOY_URL

const API_PREFIX = 'api'

export interface ApiEndpoint {
  url: string
  method: HttpMethod
}

export const API_ENDPOINTS = {
  STUDY: {
    CREATE: { url: `${baseURL}/${API_PREFIX}/studies`, method: 'POST' },
    RETRIEVE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/studies/${id}`, method: 'GET' }),
    LIST: { url: `${baseURL}/${API_PREFIX}/studies`, method: 'GET' },
    UPDATE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/studies/${id}`, method: 'PUT' }),
    DELETE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/studies/${id}`, method: 'DELETE' }),
    SIGNUP: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/studies/${id}/signup`, method: 'POST' })
  },
  MEMBER: {
    CREATE: { url: `${baseURL}/${API_PREFIX}/users`, method: 'POST' },
    RETRIEVE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/users/${id}`, method: 'GET' }),
    LIST: { url: `${baseURL}/${API_PREFIX}/users`, method: 'GET' },
    UPDATE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/users/${id}`, method: 'PUT' }),
    DELETE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/users/${id}`, method: 'DELETE' })
  },
  AUTH: {
    LOGIN: { url: `${baseURL}/${API_PREFIX}/login`, method: 'POST' },
    LOGOUT: { url: `${baseURL}/${API_PREFIX}/logout`, method: 'POST' },
    REISSUE: { url: `${baseURL}/${API_PREFIX}/reissue`, method: 'POST' },
    SIGNUP: { url: `${baseURL}/${API_PREFIX}/join`, method: 'POST' }
  }
}
