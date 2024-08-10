import { ServerResponse } from '@/app/api/utils/response'
import { ApiEndpoint } from '@/constants/apiEndpoint'
import { FetchError } from '@/errors'

export async function fetchData(route: ApiEndpoint, init?: RequestInit): Promise<ServerResponse> {
  const requestInit: RequestInit = {
    method: route.method,
    ...init
  }

  const res = await fetch(route.url, requestInit)
  if (!res.ok) {
    throw new FetchError(`Failed to fetch ${route.url} (${route.method})`)
  }
  return res.json()
}
