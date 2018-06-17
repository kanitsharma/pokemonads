// Maybe type
import { taggedSum } from 'daggy'
import { k, i } from '../../combinators/src/index'

const Maybe = taggedSum({
  Some: ['x'],
  None: []
})

Maybe.of = Maybe.Some
Maybe.empty = () => Maybe.None

Maybe.prototype.fold = (f, g) =>
  this.cata({
    Some: f,
    None: g
  })

Maybe.prototype.orElse = x => this.fold(Maybe.Some, k(x))

Maybe.prototype.getOrElse = x => this.fold(i, k(x))

Maybe.prototype.map = f => this.chain(a => Maybe.of(f(a)))

Maybe.prototype.chain = f => this.fold(a => f(a), k(Maybe.None))

Maybe.prototype.concat = x => this.chain(a => x.map(b => a.concat(b)))

Maybe.prototype.ap = a => this.chain(f => a.map(f))

Maybe.prototype.sequence = p => this.traverse(i, p)

Maybe.prototype.traverse = (f, p) =>
  this.cata({
    Some: x => f(x).map(Maybe.of),
    None: () => p.of(Maybe.None)
  })

export default Maybe
