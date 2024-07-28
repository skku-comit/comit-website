import { baseURL } from '@/types/URL'
import { Path } from '@/types/URL'

// Create
// Read
export async function fetchDatas(url: Path, title: string) {
  const res = await fetch(`${baseURL}/${url}`)
  if (!res.ok) {
    throw new Error('Failed to Fetch ${title}')
  }

  return res.json()
}
// Update
// Delete
