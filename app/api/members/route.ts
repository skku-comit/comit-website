import { members } from '@/lib/dummy'
import { Member } from '@/types/Member'

import { api } from '../utils'

const GET = api.ListFactory<Member>(members)
const POST = api.CreateFactory<Member>()
export { GET, POST }
