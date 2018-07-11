const {
  Maybe,
  Either,
  State,
  IO,
  Future,
  Reader,
  Pair,
  Do
} = require('./dist/main')
const { map, chain, compose, composeK } = require('../combinators/dist/main')
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

// Future

const apiCall = x =>
  Future((_, resolve) => {
    setTimeout(_ => resolve({ a: x }), 500)
  })

const asyncComp = compose(
  map(inc),
  map(prop('a')),
  apiCall
)

asyncComp(10).value(console.log)

// Pair

const a = Pair(10, 11)
console.log(a.fst(), a.snd())

// State

const comp1 = x => x + ' Comp1'

const comp2 = x => x + ' Comp2'

const sa = compose(
  map(comp2),
  map(comp1),
  State.of
)

console.log(sa('Yo').eval())

// Reader

const getConfig = x => map(config => config + x, Reader.ask)

const ra = compose(
  chain(getConfig),
  map(inc),
  map(prop('x')),
  Reader.of
)

const res = ra({ x: 10 }).run('This is config') // added config

console.log(res)

// do

const da = Do(function*() {
  const a = yield getAndAdd({ x: 10 }) // Either
  const b = yield addToObject({ x: 20 }) // Maybe
  const c = yield impure1(10) // IO
  const d = yield Future.of(99) // Future
  yield a + b + c + d
})

console.log(da)
