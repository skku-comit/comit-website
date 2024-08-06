import { studies } from '@/lib/dummy'
import { Study } from '@/types/Study'

import { api } from '../../utils/factory'

const GET = api.RetrieveFactory<Study>(studies)
const PUT = api.PutFactory<Study>(studies)
const PATCH = api.PatchFactory<Study>(studies)
const DELETE = api.DeleteFactory<Study>(studies)
export { DELETE, GET, PATCH, PUT }
