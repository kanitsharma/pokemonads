import compose from './compose'
import chain from './chain'

const argsToListandRev = f => (...args) => f([...args.reverse()])

const composeK = argsToListandRev(([last, ...first]) =>
  compose(
    ...first.map(chain),
    last
  )
)
export default composeK
