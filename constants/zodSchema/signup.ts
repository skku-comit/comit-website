import { z } from 'zod'

import { email, password } from '@/constants/zodSchema/signin'

const signUpSchema = z.object({
  name: z.string({ required_error: '필수' }).min(1, '필수'),
  phoneNumber: z.string({ required_error: '필수' }).min(11, '필수').max(11, '필수'),
  studentId: z
    .number({ required_error: '필수' })
    .min(10, '학번은 10자리여야 합니다.')
    .max(10, '학번은 10자리여야 합니다.'),
  email,
  password,
  confirmPassword: password
})

export default signUpSchema
