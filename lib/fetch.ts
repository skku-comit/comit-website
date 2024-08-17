import { ApiEndpoint } from '@/constants/apiEndpoint'

export async function fetchData(route: ApiEndpoint, init?: RequestInit) {
  const requestInit: RequestInit = {
    method: route.method,
    ...init
  }

  return await fetch(route.url, requestInit)
}
