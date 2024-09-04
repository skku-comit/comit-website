import { z } from 'zod'

export const profileUpdateSchema = z.object({
  profileImage: z.string().nullish(),
  bio: z.string().nullish()
})
