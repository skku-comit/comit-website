import { studyRecords } from '@/lib/dummy'
import { StudyRecord } from '@/types/Study'

import { api } from '../../utils'

const GET = api.RetrieveFactory<StudyRecord>(studyRecords)
const PUT = api.PutFactory<StudyRecord>(studyRecords)
const DELETE = api.DeleteFactory<StudyRecord>(studyRecords)
export { DELETE, GET, PUT }
