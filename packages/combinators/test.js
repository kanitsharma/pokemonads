const { I, K, compose, composeK, curry, chain, run } = require('./dist/main')

const monad = x => ({
  map: fn => monad(fn(x)),
  chain: mfn => mfn(x),
  fold: _ => x,
  run: fn => fn(x)
})

console.log(
  compose(
    I,
    K
  )(20)()
)

console.log(
  composeK(
    x => monad(x + 10),
    x => monad(x + 20),
    (x, y, z) => monad(x + y + z)
  )(1, 2, 3).fold()
)

const b = curry((a, b) => a + b)

console.log([1, 2, 3].map(b))

const a = compose(
  run(console.log),
  chain(x => monad(x + 1)),
  chain(x => monad(x + 20)),
  monad
)

a(1)
