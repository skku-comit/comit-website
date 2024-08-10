import { api } from '../../utils/factory'

const GET = api.RetrieveFactory('profile')
const PUT = api.PutFactory('profile')
const PATCH = api.PatchFactory('profile')
const DELETE = api.DeleteFactory('profile')
export { DELETE, GET, PATCH, PUT }
