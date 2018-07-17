// Either Type
import { taggedSum } from 'daggy'
import { I } from '../../combinators/src/index'

const Either = taggedSum('Either', {
  Left: ['l'],
  Right: ['r']
})

Either.of = Either.Right
Either.Left = Either.Left
Either.Right = Either.Right

// Monad, Monoid

Either.prototype.fold = function(f, g) {
  return this.cata({
    Left: f,
    Right: g
  })
}

Either.prototype.swap = function() {
  return this.fold(l => Either.Right(l), r => Either.Left(r))
}

Either.prototype.bimap = function(f, g) {
  return this.fold(l => Either.Left(f(l)), r => Either.Right(g(r)))
}

Either.prototype.chain = function(f) {
  return this.fold(l => Either.Left(l), f)
}

Either.prototype.concat = function(b) {
  return this.fold(
    l => Either.Left(l),
    r => {
      return b.chain(t => Either.Right(r.concat(t)))
    }
  )
}

Either.prototype.map = function(f) {
  return this.chain(a => Either.of(f(a)))
}

Either.prototype.ap = function(a) {
  return this.chain(f => a.map(f))
}

Either.prototype.sequence = function(p) {
  return this.traverse(I, p)
}

Either.prototype.traverse = function(f, p) {
  return this.cata({
    Left: l => p.of(Either.Left(l)),
    Right: r => f(r).map(Either.Right)
  })
}

Either.prototype.inspect = function() {
  return this.cata({
    Left: l => `Left(${l})`,
    Right: r => `Right(${r})`
  })
}

export default Either
