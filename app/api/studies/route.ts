import { NextRequest } from 'next/server'

import { constructServerResponse } from '@/lib/response'
import { supabase } from '@/lib/supabase/client'
import { createSupabaseErrorResponse } from '@/lib/supabase/utils'

import { api } from '../utils/factory'

const GET = async (req: NextRequest) => {
  const res = await supabase.from('study').select('*, mentor ( * )')

  if (res.error) return createSupabaseErrorResponse(res)
  return constructServerResponse({
    error: null,
    data: res.data
  })
}
const POST = api.CreateFactory('study')
export { GET, POST }
