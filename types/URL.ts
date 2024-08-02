import { HttpMethod } from '@/app/api/utils/httpConsts'

const baseURL =
  process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_LOCAL_URL : process.env.NEXT_PUBLIC_DEPLOY_URL

const API_PREFIX = 'api'
export interface Route {
  url: string
  method: HttpMethod
}

interface StudyRoutes {
  CREATE: Route
  RETRIEVE: (id: string) => Route
  LIST: Route
  UPDATE: (id: string) => Route
  DELETE: (id: string) => Route
}

interface MemberRoutes {
  CREATE: Route
  RETRIEVE: (id: string) => Route
  LIST: Route
  UPDATE: (id: string) => Route
  DELETE: (id: string) => Route
}

interface StudyRecordRoutes {
  CREATE: Route
  RETRIEVE: (id: string) => Route
  LIST: Route
  UPDATE: (id: string) => Route
  DELETE: (id: string) => Route
}

interface Routes {
  ABOUT: Route
  STUDY: StudyRoutes
  MEMBER: MemberRoutes
  STUDY_RECORD: StudyRecordRoutes
}

export const ROUTES: Routes = {
  ABOUT: { url: `${baseURL}/${API_PREFIX}/about`, method: 'GET' },
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
  },
  STUDY_RECORD: {
    CREATE: { url: `${baseURL}/${API_PREFIX}/study-records`, method: 'POST' },
    RETRIEVE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/study-records/${id}`, method: 'GET' }),
    LIST: { url: `${baseURL}/${API_PREFIX}/study-records`, method: 'GET' },
    UPDATE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/study-records/${id}`, method: 'PUT' }),
    DELETE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/study-records/${id}`, method: 'DELETE' })
  }
}
