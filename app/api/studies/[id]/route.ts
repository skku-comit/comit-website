import { NextRequest, NextResponse } from 'next/server'

import { getIdFromPathnameOrErrorResponse } from '@/app/api/utils'
import { supabase } from '@/lib/supabase/client'
import { createSupabaseErrorResponse } from '@/lib/supabase/utils'

import { constructServerResponse } from '../../../../lib/response'
import { api } from '../../utils/factory'

const GET = async (req: NextRequest) => {
  const { pathname } = req.nextUrl
  const id = getIdFromPathnameOrErrorResponse(pathname)
  if (id instanceof NextResponse) return id

  const res = await supabase.from('study').select('*, mentor ( * )').eq('id', id).single()

  if (res.error) return createSupabaseErrorResponse(res)
  return constructServerResponse({
    error: null,
    data: res.data
  })
}
const PUT = api.PutFactory('study')
const PATCH = api.PatchFactory('study')
const DELETE = api.DeleteFactory('study')
export { DELETE, GET, PATCH, PUT }
