import curry from './curry'

export default curry((f, x) => x.chain(f))
