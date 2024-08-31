import { PostgrestResponseFailure } from '@supabase/postgrest-js'

import { constructServerResponse } from '@/lib/response'

/**
 * Supabase의 에러 응답 객체를 `NextResponse`로 변환합니다.
 * Supabase와 상호작용 후 에러가 발생했을 때 사용합니다.
 * @param response `supabase`의 응답 객체
 * @example
 * ```ts
 * const res = await supabase.from('table').select('*')
 *
 * if (res.error) {
 *  return createSupabaseErrorResponse(res)
 * }
 *
 * return constructServerResponse({
 * error: null,
 * data: res.data
 * })
 * ```
 */
export function createSupabaseErrorResponse(response: PostgrestResponseFailure) {
  const errorResponse = constructServerResponse(
    {
      error: {
        status: response.status,
        errorType: 'SupabaseError',
        detail: response.error.details
      },
      data: null
    },
    {
      status: response.status,
      statusText: response.error.message
    }
  )
  return errorResponse
}
