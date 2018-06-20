const { i, k, compose } = require('./dist/main')

console.log(
  compose(
    i,
    k
  )(20)()
)
