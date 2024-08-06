/**
 * Route vs ApiEndpoint
 * - Route: 클라이언트에서 사용하는 path
 * - ApiEndpoint: 서버와 접속하기 위한 path
 */
export interface Route {
  name: string
  url: string
}

export const ROUTES: { [key: string]: Route } = {
  HOME: {
    name: 'Home',
    url: '/'
  },
  ABOUT: {
    name: 'About',
    url: '/about'
  },
  STUDY: {
    name: 'Study',
    url: '/study'
  },
  CLUBROOM: {
    name: 'Clubroom',
    url: '/clubroom'
  },
  LOGIN: {
    name: 'Log in',
    url: '/login'
  },
  SIGNUP: {
    name: 'Sign up',
    url: '/signup'
  }
}
