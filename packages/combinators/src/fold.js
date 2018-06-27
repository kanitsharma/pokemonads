import { curry } from 'ramda'

export default curry((f, g, x) => x.fold(f, g))
