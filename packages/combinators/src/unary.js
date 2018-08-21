const first = arr => arr[0]

const unary = fn => (...args) => fn(first(args))

export default unary
