/**
 * Route vs ApiEndpoint
 * - Route: 클라이언트에서 사용하는 path
 * - ApiEndpoint: 서버와 접속하기 위한 path
 */
export interface Route {
  name: string
  url: string
}
interface StudyRoutes {
  index: Route
  SIGNUP: (id: string) => Route
}

interface Routes {
  HOME: Route
  ABOUT: Route
  STUDY: StudyRoutes
  CLUBROOM: Route
  LOGIN: Route
  SIGNUP: Route
}

export const ROUTES: Routes = {
  HOME: {
    name: 'Home',
    url: '/'
  },
  ABOUT: {
    name: 'About',
    url: '/about'
  },
  STUDY: {
    index: {
      name: 'Study',
      url: '/study'
    },
    SIGNUP: (id: string) => ({
      name: 'Study Signup',
      url: `/study/${id}/signup`
    })
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
