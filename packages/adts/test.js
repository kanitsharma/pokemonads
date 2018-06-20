const { Maybe, Either, State, IO } = require('./dist/main')

Maybe.of(undefined).map(console.log)
Maybe.of(10).map(console.log)

Either.Right(10)
  .map(x => undefined)
  .map(console.log)

const res = State.put(10)
  .map(x => x * 10)
  .runState(10)

IO.of(_ => {
  console.log('I am impure')
  return 10
})
  .map(x => console.log('i am impure too' + x))
  .chain(_ => IO(_ => console.log('I am super impure')))
  .run()

console.log(res)
