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
      RETRIEVE: (id: number) => ({ url: `${baseURL}/${API_PREFIX}/admin/users/${id}`, method: 'GET' as HttpMethod }),
      LIST: { url: `${baseURL}/${API_PREFIX}/admin/users`, method: 'GET' as HttpMethod },
      ROLE_UPDATE: (id: number) => ({
        url: `${baseURL}/${API_PREFIX}/admin/users/${id}/role`,
        method: 'PATCH' as HttpMethod
      }),
      STAFF_UPDATE: (id: number) => ({
        url: `${baseURL}/${API_PREFIX}/admin/users/${id}/isStaff`,
        method: 'PATCH' as HttpMethod
      }),
      POSITION_UPDATE: (id: number) => ({
        url: `${baseURL}/${API_PREFIX}/admin/users/${id}/position`,
        method: 'PATCH' as HttpMethod
      }),
      DELETE: (id: number) => ({ url: `${baseURL}/${API_PREFIX}/admin/users/${id}`, method: 'DELETE' as HttpMethod })
    },
    STUDY: {
      CREATE: { url: `${baseURL}/${API_PREFIX}/admin/studies`, method: 'POST' as HttpMethod },
      RETRIEVE: (id: number) => ({ url: `${baseURL}/${API_PREFIX}/admin/studies/${id}`, method: 'GET' as HttpMethod }),
      LIST: { url: `${baseURL}/${API_PREFIX}/admin/studies`, method: 'GET' as HttpMethod },
      UPDATE_ISRECRUITING: (id: number) => ({
        url: `${baseURL}/${API_PREFIX}/admin/studies/${id}`,
        method: 'PATCH' as HttpMethod
      }),
      DELETE: (id: number) => ({ url: `${baseURL}/${API_PREFIX}/admin/studies/${id}`, method: 'DELETE' as HttpMethod })
    }
  },
  CLIENT: {
    STUDY: {
      CREATE: { url: `${baseURL}/${API_PREFIX}/studies`, method: 'POST' as HttpMethod },
      RETRIEVE: (id: number) => ({ url: `${baseURL}/${API_PREFIX}/studies/${id}`, method: 'GET' as HttpMethod }),
      LIST: { url: `${baseURL}/${API_PREFIX}/studies`, method: 'GET' as HttpMethod },
      UPDATE: (id: number) => ({ url: `${baseURL}/${API_PREFIX}/studies/${id}`, method: 'PATCH' as HttpMethod })
    },
    STAFF_LIST: { url: `${baseURL}/${API_PREFIX}/staffs`, method: 'GET' as HttpMethod },
    PROFILE: {
      RETRIEVE: { url: `${baseURL}/${API_PREFIX}/profile`, method: 'GET' as HttpMethod },
      UPDATE: { url: `${baseURL}/${API_PREFIX}/profile`, method: 'PATCH' as HttpMethod },
      DELETE: { url: `${baseURL}/${API_PREFIX}/profile`, method: 'DELETE' as HttpMethod },
      CREATED_STUDY: { url: `${baseURL}/${API_PREFIX}/profile/studies-created`, method: 'GET' as HttpMethod }
    }
  },
  AUTH: {
    LOGIN: { url: `${baseURL}/${API_PREFIX}/login`, method: 'POST' as HttpMethod },
    LOGOUT: { url: `${baseURL}/${API_PREFIX}/logout`, method: 'POST' as HttpMethod },
    REISSUE: { url: `${baseURL}/${API_PREFIX}/reissue`, method: 'POST' as HttpMethod },
    SIGNUP: { url: `${baseURL}/${API_PREFIX}/join`, method: 'POST' as HttpMethod }
  }
}

export const API_ENDPOINTS = JSP_ENDPOINTS
