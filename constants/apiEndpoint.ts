import { HttpMethod } from '@/app/api/utils/httpConsts'

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
    CREATE: { url: `/${API_PREFIX}/studies`, method: 'POST' },
    RETRIEVE: (id: string) => ({ url: `/${API_PREFIX}/studies/${id}`, method: 'GET' }),
    LIST: { url: `/${API_PREFIX}/studies`, method: 'GET' },
    UPDATE: (id: string) => ({ url: `/${API_PREFIX}/studies/${id}`, method: 'PUT' }),
    DELETE: (id: string) => ({ url: `/${API_PREFIX}/studies/${id}`, method: 'DELETE' })
  },
  MEMBER: {
    CREATE: { url: `/${API_PREFIX}/users`, method: 'POST' },
    RETRIEVE: (id: string) => ({ url: `/${API_PREFIX}/users/${id}`, method: 'GET' }),
    LIST: { url: `/${API_PREFIX}/users`, method: 'GET' },
    UPDATE: (id: string) => ({ url: `/${API_PREFIX}/users/${id}`, method: 'PUT' }),
    DELETE: (id: string) => ({ url: `/${API_PREFIX}/users/${id}`, method: 'DELETE' })
  }
}
