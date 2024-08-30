import { NextResponse } from 'next/server'

import { constructServerResponse } from '@/lib/response'
import { NoIdProvided } from '@/lib/response/errors'

export function getIdFromPathnameOrErrorResponse(pathname: string): string | NextResponse {
  const id = pathname.split('/').pop()
  if (!id) {
    return constructServerResponse({
      error: NoIdProvided,
      data: null
    })
  }
  return id
}
