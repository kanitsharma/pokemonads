import curry from './curry'

export default fn => curry((x, y) => fn(y, x))
