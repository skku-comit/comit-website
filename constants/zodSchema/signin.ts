import { z } from 'zod'

export const email = z
  .string({ required_error: '이메일을 입력해주세요.' })
  .min(1, '이메일을 입력해주세요.')
  .email('유효하지 않은 이메일입니다.')
export const password = z
  .string({ required_error: '필수' })
  .regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{6,20}$/, '영문, 숫자를 포함한 6~20자리의 비밀번호여야 합니다.')

const signInSchema = z.object({
  email,
  password
})

export default signInSchema
