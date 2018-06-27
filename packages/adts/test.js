const { Maybe, Either, State, IO, Future, Reader } = require('./dist/main')
const { map, chain, compose } = require('../combinators/dist/main')

const res = Maybe.of(undefined)
  .map(x => x * 100)
  .isNothing()

Maybe.of(10).map(console.log)

Either.Right(10)
  .map(x => undefined)
  .map(console.log)

const res1 = State.put(10)
  .map(x => x * 10)
  .runState(10)
  .snd()

IO.of(_ => {
  console.log('I am impure')
  return 10
})
  .map(x => console.log('i am impure too' + x))
  .chain(_ => IO(_ => console.log('I am super impure')))
  .run()

Future((rej, res) => {
  setTimeout(_ => res(), 1000)
})
  .map(_ => console.log('I am async'))
  .value(console.log)

Reader.of(100)
  .map(x => x + 10)
  .chain(x => Reader.ask.map(y => x + y))
  .map(console.log)
  .run(200)

console.log(res)

const resP = compose(
  chain(x => map(y => x + y, Reader.ask)),
  map(x => x * 10),
  Reader.of
)

console.log(resP(10).run(1))
