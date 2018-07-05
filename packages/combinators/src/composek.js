import compose from './compose'
import chain from './chain'
import { unary, reverse } from 'ramda'

const argsToListandRev = f => (...args) => f(reverse(args))

const composeK = argsToListandRev(([last, ...first]) =>
  compose(
    ...first.map(unary(chain)),
    last
  )
)
export default composeK
