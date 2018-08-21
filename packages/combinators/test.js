const {
  I,
  K,
  compose,
  composeK,
  chain,
  run,
  tap,
  ap,
  flip,
  curry
} = require('./dist/main')

const test = require('ava')

const monad = x => ({
  map: fn => monad(fn(x)),
  chain: mfn => mfn(x),
  fold: _ => x,
  run: fn => fn(x),
  ap: a => chain(x => a.map(x))
})

test('I and K combinators', t => {
  const a = compose(
    I,
    K
  )

  t.deepEqual(a(20)(), 20)
  t.deepEqual(a(-20)(), -20)
})

test('composeK', t => {
  const a = composeK(
    x => monad(x + 10),
    x => monad(x + 20),
    (x, y, z) => monad(x + y + z)
  )

  t.deepEqual(a(1, 2, 3).fold(), 36)
})

test('pointfree', t => {
  const a = compose(
    run,
    ap(monad(10)),
    chain(tap(console.log)),
    chain(x => monad(x + 1)),
    chain(x => monad(x + 20)),
    monad
  )

  t.deepEqual(typeof a(1), 'function')
})

test('flip', t => {
  const a = curry((x, y) => [x, y])
  const flipped = flip(a)

  t.deepEqual(flipped(1, 2), [2, 1])
  t.deepEqual(flipped(1)(2), [2, 1])
})

test('curry', t => {
  const add = (a, b) => a + b
  const curried = curry(add)

  t.deepEqual(curried(1)(2), 3)
  t.deepEqual(curried(1, 2), 3)
})
