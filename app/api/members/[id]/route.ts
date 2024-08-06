import { members } from '@/lib/dummy'
import { Member } from '@/types/Member'

import { api } from '../../utils/factory'

const GET = api.RetrieveFactory<Member>(members)
const PUT = api.PutFactory<Member>(members)
const PATCH = api.PatchFactory<Member>(members)
const DELETE = api.DeleteFactory<Member>(members)
export { DELETE, GET, PATCH, PUT }
