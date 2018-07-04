import compose from './compose'
import chain from './chain'

const argsToListandRev = f => (...args) => f([...args.reverse()])

const composeK = argsToListandRev(([last, ...first]) =>
  compose(
    ...first.map(x => chain(x)),
    last
  )
)
export default composeK
