import { FetchError } from '@/errors'
import { Route } from '@/types/URL'

export async function fetchData(route: Route) {
  const res = await fetch(route.url, { method: route.method })
  if (!res.ok) {
    throw new FetchError(`Failed to Fetch ${route.url} (${route.method})`)
  }

  return res.json()
}
