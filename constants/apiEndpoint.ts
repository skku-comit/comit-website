import { HttpMethod } from '@/app/api/utils/httpConsts'

const baseURL =
  process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_LOCAL_URL : process.env.NEXT_PUBLIC_DEPLOY_URL

const API_PREFIX = 'api'

export interface ApiEndpoint {
  url: string
  method: HttpMethod
}

interface StudyRoutes {
  CREATE: ApiEndpoint
  RETRIEVE: (id: string) => ApiEndpoint
  LIST: ApiEndpoint
  UPDATE: (id: string) => ApiEndpoint
  DELETE: (id: string) => ApiEndpoint

  SIGNUP: (id: string) => ApiEndpoint
}

interface MemberRoutes {
  CREATE: ApiEndpoint
  RETRIEVE: (id: string) => ApiEndpoint
  LIST: ApiEndpoint
  UPDATE: (id: string) => ApiEndpoint
  DELETE: (id: string) => ApiEndpoint
}

interface ApiEndpoints {
  STUDY: StudyRoutes
  MEMBER: MemberRoutes
}

export const API_ENDPOINTS: ApiEndpoints = {
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
  }
}
