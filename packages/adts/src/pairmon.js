// TODO: implement functor. monad, monoid

import { tagged } from 'daggy'

const Pair = tagged('Pair', ['value', 'state'])

Pair.prototype.fst = function() {
  return this.value
}

Pair.prototype.snd = function() {
  return this.state
}

// Funtor :: Fa -> (a -> b) -> Fb

Pair.prototype.map = function(fn) {
  return Pair(this.value, fn(this.state))
}

// Monad :: Ma -> (a -> Mb) -> Mb

Pair.prototype.chain = function(fn) {
  return fn(this)
}

// Bimap :: Fab -> (a -> c) -> (b -> d) -> Fcd

export default Pair
