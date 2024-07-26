export const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_LOCAL_URL
    : process.env.NEXT_PUBLIC_DEPLOY_URL

export type Path =
  | 'api/studies'
  | 'api/members'
  | 'api/about'
  | 'api/members'
  | 'api/study-records'
