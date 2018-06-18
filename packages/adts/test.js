const { Maybe, Either, State } = require('./dist/main')

Maybe.of(undefined).map(console.log)
Maybe.of(10).map(console.log)

Either.Right(10)
  .map(x => undefined)
  .map(console.log)

const res = State.of(10)
  .map(x => x + 10)
  .inspect()

console.log(res)
