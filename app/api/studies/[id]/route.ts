import { api } from '../../utils/factory'

const GET = api.RetrieveFactory('study')
const PUT = api.PutFactory('study')
const PATCH = api.PatchFactory('study')
const DELETE = api.DeleteFactory('study')
export { DELETE, GET, PATCH, PUT }
