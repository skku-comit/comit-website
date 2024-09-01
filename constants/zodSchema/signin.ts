import { z } from 'zod'

export const email = z.string({ required_error: '필수' }).min(1, '필수').email('유효하지 않은 이메일입니다.')
export const password = z
  .string({ required_error: '필수' })
  .min(1, '필수')
  .min(8, '비밀번호는 8자리 이상이어야 합니다.')
  .max(20, '비밀번호는 20자리 이하여야 합니다.')

const signInSchema = z.object({
  email,
  password
})

export default signInSchema
