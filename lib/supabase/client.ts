import { createClient } from '@supabase/supabase-js'

import { Database } from '@/database.types'

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
export const TEST_USER_ID = 'b5851320-d374-4763-a7d5-70427602c19b' // 손장수
