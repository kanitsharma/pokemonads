import { tagged } from 'daggy'
import { K, I } from '../../combinators/src/index'

const Reader = tagged('Reader', ['run'])

Reader.of = a => Reader(K(a))

Reader.ask = Reader(I)

Reader.prototype.chain = function(f) {
  return Reader(e => f(this.run(e)).run(e))
}

Reader.prototype.map = function(f) {
  return this.chain(a => Reader.of(f(a)))
}

Reader.prototype.ap = function(a) {
  return this.chain(f => a.map(f))
}

export default Reader
