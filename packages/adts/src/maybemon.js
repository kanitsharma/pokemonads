// Maybe type
import { taggedSum } from 'daggy'
import { K, I } from '../../combinators/src/index'

const Maybe = taggedSum('Maybe', {
  Just: ['x'],
  Nothing: []
})

Maybe.prototype.fold = function(f, g) {
  return this.cata({
    Just: f,
    Nothing: g
  })
}

Maybe.of = Maybe.Just
Maybe.empty = () => Maybe.Nothing
Maybe.fromNullable = val => (val ? Maybe.Just(val) : Maybe.Nothing())

Maybe.prototype.inspect = function() {
  return this.isJust() ? `Just(${this.x})` : `Nothing()`
}

Maybe.prototype.isJust = function() {
  return !!this.x
}

Maybe.prototype.isNothing = function() {
  return !this.x
}

Maybe.prototype.orElse = function(x) {
  return this.fold(Maybe.Just, K(x))
}

Maybe.prototype.getOrElse = function(x) {
  return this.fold(i, K(x))
}

Maybe.prototype.chain = function(f) {
  return this.fold(a => f(a), K(Maybe.Nothing))
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
  return this.traverse(I, p)
}

Maybe.prototype.traverse = function(f, p) {
  return this.cata({
    Just: x => f(x).map(Maybe.of),
    Nothing: () => p.of(Maybe.Nothing)
  })
}

export default Maybe
