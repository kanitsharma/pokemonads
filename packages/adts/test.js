const { Maybe, Either, State, IO, Future, Reader } = require('./dist/main')
const { map, chain, compose, composeK, I } = require('../combinators/dist/main')
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

// IO

const callToServer = x => {
  console.log('Sent to server' + x)
}

const makeChangesToDOM = x => {
  console.log('DOM changed to' + x)
}

const impure1 = x =>
  IO.of(_ => {
    callToServer(x) // side effect
    return x
  })

const impure2 = x =>
  IO.of(_ => {
    makeChangesToDOM(x) // side effect
    return x
  })

const impureComputation = composeK(
  impure2,
  impure1
)

const c = impureComputation(10)

console.log(c.run())

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
