import { HttpMethod } from '@/app/api/utils/httpConsts'

const baseURL =
  process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_LOCAL_URL : process.env.NEXT_PUBLIC_DEPLOY_URL

const API_PREFIX = 'api'

interface DynamicEndpoint {
  (id: string): ApiEndpoint
}

interface AdminUserEndpoints {
  RETRIEVE: DynamicEndpoint
  LIST: ApiEndpoint
  ROLE_UPDATE: DynamicEndpoint
  STAFF_UPDATE: DynamicEndpoint
}

interface AdminEndpoints {
  USER: AdminUserEndpoints
}

interface ClientStudyEndpoints {
  CREATE: ApiEndpoint
  RETRIEVE: DynamicEndpoint
  LIST: ApiEndpoint
  UPDATE: DynamicEndpoint
  DELETE: DynamicEndpoint
}

interface ClientUserStaffProfileEndpoints {
  STAFF_PROFILE: ApiEndpoint
  CURRENT_USER: ApiEndpoint
}

interface ClientUserProfileEndpoints {
  PROFILE: ApiEndpoint
  UPDATE: ApiEndpoint
  DELETE: ApiEndpoint
}

interface ClientUserEndpoints {
  STAFF_PROFILE: ClientUserStaffProfileEndpoints
  PROFILE: ClientUserProfileEndpoints
}

interface ClientEndpoints {
  STUDY: ClientStudyEndpoints
  USER: ClientUserEndpoints
}

interface AuthEndpoints {
  LOGIN: ApiEndpoint
  LOGOUT: ApiEndpoint
  REISSUE: ApiEndpoint
  SIGNUP: ApiEndpoint
}

interface JspEndpoints {
  ADMIN: AdminEndpoints
  CLIENT: ClientEndpoints
  AUTH: AuthEndpoints
}

export interface ApiEndpoint {
  url: string
  method: HttpMethod
}

// const SUPABASE_ENDPOINTS: ApiEndpoints = {
//   STUDY: {
//     CREATE: { url: `${baseURL}/${API_PREFIX}/studies`, method: 'POST' },
//     RETRIEVE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/studies/${id}`, method: 'GET' }),
//     LIST: { url: `${baseURL}/${API_PREFIX}/studies`, method: 'GET' },
//     UPDATE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/studies/${id}`, method: 'PUT' }),
//     DELETE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/studies/${id}`, method: 'DELETE' }),
//     SIGNUP: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/studies/${id}/signup`, method: 'POST' })
//   },
//   MEMBER: {
//     CREATE: { url: `${baseURL}/${API_PREFIX}/users`, method: 'POST' },
//     RETRIEVE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/users/${id}`, method: 'GET' }),
//     LIST: { url: `${baseURL}/${API_PREFIX}/users`, method: 'GET' },
//     UPDATE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/users/${id}`, method: 'PUT' }),
//     DELETE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/users/${id}`, method: 'DELETE' })
//   },
//   PROFILE: {
//     url: `${baseURL}/${API_PREFIX}/users/profile`,
//     method: 'GET'
//   },
//   AUTH: {
//     LOGIN: { url: `${baseURL}/${API_PREFIX}/login`, method: 'POST' },
//     LOGOUT: { url: `${baseURL}/${API_PREFIX}/logout`, method: 'POST' },
//     REISSUE: { url: `${baseURL}/${API_PREFIX}/reissue`, method: 'POST' },
//     SIGNUP: { url: `${baseURL}/${API_PREFIX}/join`, method: 'POST' }
//   }
// }

const JSP_ENDPOINTS: JspEndpoints = {
  ADMIN: {
    USER: {
      RETRIEVE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/admin/users/${id}`, method: 'GET' }),
      LIST: { url: `${baseURL}/${API_PREFIX}/admin/users`, method: 'GET' },
      ROLE_UPDATE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/admin/users/${id}`, method: 'PATCH' }),
      STAFF_UPDATE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/admin/users/${id}`, method: 'PATCH' })
    }
  },
  CLIENT: {
    STUDY: {
      CREATE: { url: `${baseURL}/${API_PREFIX}/studies`, method: 'POST' },
      RETRIEVE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/studies/${id}`, method: 'GET' }),
      LIST: { url: `${baseURL}/${API_PREFIX}/studies`, method: 'GET' },
      UPDATE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/studies/${id}`, method: 'PUT' }),
      DELETE: (id: string) => ({ url: `${baseURL}/${API_PREFIX}/studies/${id}`, method: 'DELETE' })
    },
    USER: {
      STAFF_PROFILE: {
        STAFF_PROFILE: { url: `${baseURL}/${API_PREFIX}/users?isStaff=false`, method: 'GET' },
        CURRENT_USER: { url: `${baseURL}/${API_PREFIX}/users`, method: 'GET' }
      },
      PROFILE: {
        PROFILE: { url: `${baseURL}/${API_PREFIX}/users/profile`, method: 'GET' },
        UPDATE: { url: `${baseURL}/${API_PREFIX}/users`, method: 'PUT' },
        DELETE: { url: `${baseURL}/${API_PREFIX}/users`, method: 'DELETE' }
      }
    }
  },
  AUTH: {
    LOGIN: { url: `${baseURL}/${API_PREFIX}/login`, method: 'POST' },
    LOGOUT: { url: `${baseURL}/${API_PREFIX}/logout`, method: 'POST' },
    REISSUE: { url: `${baseURL}/${API_PREFIX}/reissue`, method: 'POST' },
    SIGNUP: { url: `${baseURL}/${API_PREFIX}/join`, method: 'POST' }
  }
}

// export const API_ENDPOINTS: JspEndpoints = process.env.NODE_ENV === 'development' ? SUPABASE_ENDPOINTS : JSP_ENDPOINTS
export const API_ENDPOINT = JSP_ENDPOINTS
