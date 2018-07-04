const { i, k, compose, composeK } = require('./dist/main')

const monad = x => ({
  map: fn => monad(fn(x)),
  chain: mfn => mfn(x),
  fold: _ => x
})

console.log(
  compose(
    i,
    k
  )(20)()
)

console.log(
  composeK(
    x => monad(x + 10),
    x => monad(x + 20),
    (x, y, z) => monad(x + y + z)
  )(1, 2, 3)
)
