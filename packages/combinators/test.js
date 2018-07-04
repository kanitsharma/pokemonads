const { I, K, compose, composeK, curry, chain } = require('./dist/main')

const monad = x => ({
  map: fn => monad(fn(x)),
  chain: mfn => mfn(x),
  fold: _ => x
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

// const a = curry((a, b) => a + b)

const a = compose(
  chain(x => monad(x + 1)),
  chain(x => monad(x + 20)),
  monad
)

console.log(a(1).fold())
