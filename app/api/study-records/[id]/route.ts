import { studyRecords } from '@/lib/dummy'
import { StudyRecord } from '@/types/Study'

import { api } from '../../utils'

const GET = api.RetrieveFactory<StudyRecord>(studyRecords)

export { GET }
