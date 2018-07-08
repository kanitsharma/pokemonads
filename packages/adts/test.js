const { Maybe, Either, State, IO, Future, Reader } = require('./dist/main')
const { map, chain, compose } = require('../combinators/dist/main')
const { prop, inc, ifElse, has } = require('ramda')

// Maybe
const ma = { x: 10 }

const addToObject = compose(
  map(inc),
  map(prop('x')),
  Maybe.of
)

console.log(addToObject(ma))

// Either
const getAndAdd = compose(
  map(inc),
  map(prop('x')),
  ifElse(has('x'), Either.Right, Either.Left)
)

console.log(getAndAdd({ y: 10 }))

// Either.Right(10)
//   .map(x => undefined)
//   .map(console.log)

// const res1 = State.put(10)
//   .map(x => x * 10)
//   .runState(10)
//   .snd()

// IO.of(_ => {
//   console.log('I am impure')
//   return 10
// })
//   .map(x => console.log('i am impure too' + x))
//   .chain(_ => IO(_ => console.log('I am super impure')))
//   .run()

// Future((rej, res) => {
//   setTimeout(_ => res(), 1000)
// })
//   .map(_ => console.log('I am async'))
//   .value(console.log)

// Reader.of(100)
//   .map(x => x + 10)
//   .chain(x => Reader.ask.map(y => x + y))
//   .map(console.log)
//   .run(200)

// console.log(res)

// const resP = compose(
//   chain(x => map(y => x + y, Reader.ask)),
//   map(x => x * 10),
//   Reader.of
// )

// console.log(resP(10).run(1))
