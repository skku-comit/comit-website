import { baseURL } from '@/types/baseURL'

async function fetchStudyList() {
  const res = await fetch(`${baseURL}/api/studies`)
  if (!res.ok) {
    throw new Error('Failed to Fetch Studies')
  }

  return res.json()
}

async function fetchMembers() {
  const res = await fetch(`${baseURL}/api/members`)
  if (!res.ok) {
    throw new Error('Failed to Fetch Members')
  }

  return res.json()
}
