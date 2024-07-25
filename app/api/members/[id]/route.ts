import { members } from '@/lib/dummy'
import { Member } from '@/types/Member'

import { api } from '../../utils'

const GET = api.RetrieveFactory<Member>(members)
export { GET }
