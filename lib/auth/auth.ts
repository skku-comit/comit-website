import NextAuth, { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const BASE_AUTH_PATH = '/api/auth'

const authOptions: NextAuthConfig = {
  // pages: {
  //   signIn: ROUTES.LOGIN.url,
  //   newUser: ROUTES.SIGNUP.url
  // },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Enter your email' },
        password: { label: 'password', type: 'password' }
      },
      // TODO: Promise<any> to Promise<User | null>
      async authorize(credentials, request): Promise<any> {
        // #1. logic to verify if the User exists
        const User = {
          email: credentials.email,
          password: credentials.password
        }
        console.log(User)

        // const res = await fetchData(API_ENDPOINTS.MEMBER.CREATE)
        // console.log(res)

        // if (!res) {
        //   // No user found, so this is their first attempt to login
        //   // meaning this is also the place you could do registration
        //   throw new Error('User not found.')
        // }

        // // return user object with their profile data
        // return res
      }
    })
  ],
  basePath: BASE_AUTH_PATH,
  secret: process.env.AUTH_SECRET
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)
