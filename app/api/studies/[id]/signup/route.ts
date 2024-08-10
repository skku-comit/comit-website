import { NextRequest } from 'next/server'

import { HttpStatusCode } from '@/app/api/utils/httpConsts'
import { getNextResponse } from '@/app/api/utils/response'

const POST = async (req: NextRequest) => {
  const data = await req.json()

  return getNextResponse({
    error: null,
    data: null,
    count: null,
    status: HttpStatusCode.NotImplemented,
    statusText: `Server got requst: ${data}. But this endpoint is not implemented`
  })
}
export { POST }
