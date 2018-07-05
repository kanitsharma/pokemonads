import compose from './compose'
import chain from './chain'
import { unary } from 'ramda'

const argsToListandRev = f => (...args) => f([...args.reverse()])

const composeK = argsToListandRev(([last, ...first]) =>
  compose(
    ...first.map(unary(chain)),
    last
  )
)
export default composeK
