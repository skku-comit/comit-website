import { studyRecords } from '@/lib/dummy'
import { StudyRecord } from '@/types/Study'

import { api } from '../utils'

const GET = api.ListFactory<StudyRecord>(studyRecords)
const POST = api.CreateFactory<StudyRecord>()
export { GET, POST }
