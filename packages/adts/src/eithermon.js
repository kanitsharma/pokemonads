const { tagged, taggedSum } = require('daggy')
const { compose, identity } = require('fantasy-combinators')
const { of, chain, concat, map, ap, sequence } = require('fantasy-land')

const Either = taggedSum({
  Left: ['l'],
  Right: ['r']
})

// Methods
Either.prototype.fold = function(f, g) {
  return this.cata({
    Left: f,
    Right: g
  })
}
Either[of] = Either.Right
Either.prototype.swap = function() {
  return this.fold(l => Either.Right(l), r => Either.Left(r))
}
Either.prototype.bimap = function(f, g) {
  return this.fold(l => Either.Left(f(l)), r => Either.Right(g(r)))
}
Either.prototype[chain] = function(f) {
  return this.fold(l => Either.Left(l), f)
}
Either.prototype[concat] = function(b) {
  return this.fold(
    l => Either.Left(l),
    r => {
      return b[chain](t => Either.Right(r[concat](t)))
    }
  )
}

// Derived
Either.prototype[map] = function(f) {
  return this[chain](a => Either[of](f(a)))
}
Either.prototype[ap] = function(a) {
  return this[chain](f => a[map](f))
}

Either.prototype[sequence] = function(p) {
  return this.traverse(identity, p)
}
Either.prototype.traverse = function(f, p) {
  return this.cata({
    Left: l => p[of](Either.Left(l)),
    Right: r => f(r)[map](Either.Right)
  })
}
