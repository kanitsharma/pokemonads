import { tagged } from 'daggy'

const Pair = tagged('Pair', ['value', 'state'])

Pair.prototype.fst = function() {
  return this.value
}

Pair.prototype.snd = function() {
  return this.state
}

export default Pair
