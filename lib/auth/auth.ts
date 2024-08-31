import NextAuth, { NextAuthConfig, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { HttpStatusCode } from '@/app/api/utils/httpConsts'
import { API_ENDPOINTS, ApiEndpoint } from '@/constants/apiEndpoint'
import { ROUTES } from '@/constants/routes'
import { fetchData } from '@/lib/fetch'
import { CustomResponseDTO } from '@/lib/response'

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
      async authorize(credentials): Promise<User | null> {
        const res = await fetchData(API_ENDPOINTS.AUTH.LOGIN as ApiEndpoint, {
          body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const data = (await res.json()) as CustomResponseDTO
        if (!res.ok) {
          switch (res.status) {
            case HttpStatusCode.UnAuthorized:
              return null
            default:
              throw new Error(`Unhandled Error: ${data.error?.errorType} ${data.error?.detail}`)
          }
        }
        const userInitialData = data.data
        if (!userInitialData) return null
        const { id, name } = userInitialData
        // const user: CustomUser = await getFullUserDataWithToken()
        return { id, name }
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
