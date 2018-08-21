import curry from './curry'

export default curry((f, x) => x.map(f))
