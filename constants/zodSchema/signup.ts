import { z } from 'zod'

import { email, password } from '@/constants/zodSchema/signin'

const signUpSchema = z.object({
  username: z.string({ required_error: '필수' }).min(1, '필수'),
  phoneNumber: z
    .string({ required_error: '필수' })
    .min(11, '핸드폰 번호는 11자리여야 합니다.')
    .max(11, '핸드폰 번호는 11자리여야 합니다.'),
  studentId: z
    .string({ required_error: '필수' })
    .min(10, '학번은 10자리여야 합니다.')
    .max(10, '학번은 10자리여야 합니다.'),
  email,
  password,
  consent: z.literal(true, {
    errorMap: () => ({ message: '개인 정보 수집 / 이용 동의는 필수입니다.' })
  })
})

export default signUpSchema
