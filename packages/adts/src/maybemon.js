// Maybe type
import { taggedSum } from 'daggy'
import { k, i } from '../../combinators/src/index'

const Maybe = taggedSum('Maybe', {
  Some: ['x'],
  None: []
})

Maybe.prototype.fold = function(f, g) {
  return this.cata({
    Some: f,
    None: g
  })
}

Maybe.of = Maybe.Some
Maybe.empty = () => Maybe.None

Maybe.prototype.orElse = function(x) {
  return this.fold(Maybe.Some, k(x))
}

Maybe.prototype.getOrElse = function(x) {
  return this.fold(i, k(x))
}

Maybe.prototype.chain = function(f) {
  return this.fold(a => f(a), k(Maybe.None))
}

Maybe.prototype.concat = function(x) {
  return this.chain(a => {
    return x.map(b => a.concat(b))
  })
}

Maybe.prototype.map = function(f) {
  return this.chain(a => Maybe.of(f(a)))
}

Maybe.prototype.ap = function(a) {
  return this.chain(f => a.map(f))
}

Maybe.prototype.sequence = function(p) {
  return this.traverse(i, p)
}

Maybe.prototype.traverse = function(f, p) {
  return this.cata({
    Some: x => f(x).map(Maybe.of),
    None: () => p.of(Maybe.None)
  })
}

export default Maybe
