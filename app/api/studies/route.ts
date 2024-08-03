import { studies } from '@/lib/dummy'
import { Study } from '@/types/Study'

import { api } from '../utils/factory'

const GET = api.ListFactory<Study>(studies)
const POST = api.CreateFactory<Study>()
export { GET, POST }
