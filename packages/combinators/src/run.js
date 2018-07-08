import { curry } from 'ramda'

export default curry((f, x) => x.run(f))
