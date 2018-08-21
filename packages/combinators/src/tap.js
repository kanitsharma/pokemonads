import curry from './curry'

export default curry((fn, x) => {
  fn(x)
  return x
})
