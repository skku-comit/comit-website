import { ApiEndpoint } from '@/constants/apiEndpoint'
import { FetchError } from '@/errors'

export async function fetchData(route: ApiEndpoint) {
  const res = await fetch(route.url, { method: route.method })
  if (!res.ok) {
    throw new FetchError(`Failed to Fetch ${route.url} (${route.method})`)
  }

  return res.json()
}
