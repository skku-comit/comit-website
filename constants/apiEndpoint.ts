import { HttpMethod } from '@/app/api/utils/httpConsts'

const baseURL =
  process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_LOCAL_URL : process.env.NEXT_PUBLIC_DEPLOY_URL

const API_PREFIX = 'api'

export interface ApiEndpoint {
  url: string
  method: HttpMethod
}

const JSP_ENDPOINTS = {
  ADMIN: {
    USER: {
      RETRIEVE: (id: number) => ({ url: `${baseURL}/${API_PREFIX}/admin/users/${id}`, method: 'GET' }),
      LIST: { url: `${baseURL}/${API_PREFIX}/admin/users`, method: 'GET' },
      ROLE_UPDATE: (id: number) => ({ url: `${baseURL}/${API_PREFIX}/admin/users/${id}`, method: 'PATCH' }),
      STAFF_UPDATE: (id: number) => ({ url: `${baseURL}/${API_PREFIX}/admin/users/${id}`, method: 'PATCH' }),
      DELETE: (id: number) => ({ url: `${baseURL}/${API_PREFIX}/admin/users/${id}`, method: 'DELETE' })
    },
    STUDY: {
      CREATE: { url: `${baseURL}/${API_PREFIX}/admin/studies`, method: 'POST' },
      RETRIEVE: (id: number) => ({ url: `${baseURL}/${API_PREFIX}/admin/studies/${id}`, method: 'GET' }),
      LIST: { url: `${baseURL}/${API_PREFIX}/admin/studies`, method: 'GET' },
      UPDATE: (id: number) => ({ url: `${baseURL}/${API_PREFIX}/admin/studies/${id}`, method: 'PUT' }),
      DELETE: (id: number) => ({ url: `${baseURL}/${API_PREFIX}/admin/studies/${id}`, method: 'DELETE' })
    }
  },
  CLIENT: {
    STUDY: {
      CREATE: { url: `${baseURL}/${API_PREFIX}/studies`, method: 'POST' },
      RETRIEVE: (id: number) => ({ url: `${baseURL}/${API_PREFIX}/studies/${id}`, method: 'GET' }),
      LIST: { url: `${baseURL}/${API_PREFIX}/studies`, method: 'GET' },
      UPDATE: (id: number) => ({ url: `${baseURL}/${API_PREFIX}/studies/${id}`, method: 'PUT' })
    },
    STAFF_LIST: { url: `${baseURL}/${API_PREFIX}/staffs`, method: 'GET' },
    PROFILE: {
      RETRIEVE: { url: `${baseURL}/${API_PREFIX}/profile`, method: 'GET' },
      UPDATE: { url: `${baseURL}/${API_PREFIX}/profile`, method: 'PUT' },
      DELETE: { url: `${baseURL}/${API_PREFIX}/profile`, method: 'DELETE' }
    }
  },
  AUTH: {
    LOGIN: { url: `${baseURL}/${API_PREFIX}/login`, method: 'POST' },
    LOGOUT: { url: `${baseURL}/${API_PREFIX}/logout`, method: 'POST' },
    REISSUE: { url: `${baseURL}/${API_PREFIX}/reissue`, method: 'POST' },
    SIGNUP: { url: `${baseURL}/${API_PREFIX}/join`, method: 'POST' }
  }
}

export const API_ENDPOINTS = JSP_ENDPOINTS
