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
}

interface MemberRoutes {
  CREATE: ApiEndpoint
  RETRIEVE: (id: string) => ApiEndpoint
  LIST: ApiEndpoint
  UPDATE: (id: string) => ApiEndpoint
  DELETE: (id: string) => ApiEndpoint
}

interface Routes {
  STUDY: StudyRoutes
  MEMBER: MemberRoutes
}

export const API_ENDPOINTS: Routes = {
  STUDY: {
    CREATE: { url: `${baseURL}/${API_PREFIX}/studies`, method: 'POST' },
    RETRIEVE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/studies/${id}`, method: 'GET' }),
    LIST: { url: `${baseURL}/${API_PREFIX}/studies`, method: 'GET' },
    UPDATE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/studies/${id}`, method: 'PUT' }),
    DELETE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/studies/${id}`, method: 'DELETE' })
  },
  MEMBER: {
    CREATE: { url: `${baseURL}/${API_PREFIX}/members`, method: 'POST' },
    RETRIEVE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/members/${id}`, method: 'GET' }),
    LIST: { url: `${baseURL}/${API_PREFIX}/members`, method: 'GET' },
    UPDATE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/members/${id}`, method: 'PUT' }),
    DELETE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/members/${id}`, method: 'DELETE' })
  }
}
