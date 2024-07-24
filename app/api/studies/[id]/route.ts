import { studies } from '@/lib/dummy'
import { Study } from '@/types/Study'

import { api } from '../../utils'

const GET = api.RetrieveFactory<Study>(studies)
export { GET }
