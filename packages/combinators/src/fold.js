import curry from './curry'

export default curry((f, g, x) => x.fold(f, g))
