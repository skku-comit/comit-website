/**
 * Route vs ApiEndpoint
 * - Route: 클라이언트에서 사용하는 path
 * - ApiEndpoint: 서버와 접속하기 위한 path
 */
export interface Route {
  name: string
  url: string
}

export const ROUTES = {
  HOME: {
    name: 'Home',
    url: '/'
  } satisfies Route,
  ABOUT: {
    name: 'About',
    url: '/about'
  } satisfies Route,
  STUDY: {
    name: 'Study',
    url: '/study'
  } satisfies Route,
  CLUBROOM: {
    name: 'Clubroom',
    url: '/clubroom'
  } satisfies Route,
  LOGIN: {
    name: 'Log in',
    url: '/login'
  } satisfies Route,
  SIGNUP: {
    name: 'Sign up',
    url: '/signup'
  } satisfies Route
}
