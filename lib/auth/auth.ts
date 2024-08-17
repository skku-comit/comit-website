import NextAuth, { NextAuthConfig, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { ROUTES } from '@/constants/routes'

export const BASE_AUTH_PATH = '/api/auth'

const authOptions: NextAuthConfig = {
  pages: {
    signIn: ROUTES.LOGIN.url,
    newUser: ROUTES.SIGNUP.url
  },
  session: {
    strategy: 'jwt'
  },
  providers: [
    Credentials({
      name: 'Credentials',

      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Enter your Email' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials, request): Promise<User | null> {
        // Todo: 서버에서 로그인 완료 후 AT, RT 받아와서 저장하는 로직
        const dummy_users = [
          {
            id: '1',
            name: 'b0xercat',
            email: 'comit@g.skku.edu',
            password: 'comit1234'
          },
          {
            id: '2',
            name: 'Test 2',
            email: 'test@g.skku.edu',
            password: 'comit1234'
          }
        ]

        const user = dummy_users.find(
          (user) => user.email === credentials.email && user.password === credentials.password
        )

        return user ? { id: user.id, name: user.name, email: user.email } : null
      }
    })
  ],
  callbacks: {
    /**
     * called anytime the user is redirected to a callback URL (i.e. on signin or signout).
     * By default only URLs on the same host as the origin are allowed.
     * url : URL provided as callback URL by the client
     * baseURL:  Default base URL of site (can be used as fallback)
     */
    async redirect({ url, baseUrl }) {
      return baseUrl
    }
  },
  basePath: BASE_AUTH_PATH,
  secret: process.env.AUTH_SECRET // 복호화
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)

export const signInSA = async () => {
  return await signIn()
}

export const signOutSA = async () => {
  return await signOut()
}
