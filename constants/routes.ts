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
  },
  MYSTUDY: {
    name: 'My Studies',
    url: '/mystudy'
  },
  PROFILE: {
    name: 'My Profile',
    url: '/profile'
  },
  ADMIN: {
    DASHBOARD: {
      name: 'Dashboard',
      url: '/admin'
    },
    STUDY: {
      name: 'Study Management',
      url: '/admin/studies'
    },
    USER: {
      name: 'User Management',
      url: '/admin/users'
    }
  }
}
