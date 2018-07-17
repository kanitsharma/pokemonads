const {
  Maybe,
  Either,
  State,
  IO,
  Future,
  Reader,
  Pair,
  Do,
  AsyncDo
} = require('./dist/main')
const { map, chain, compose, composeK } = require('../combinators/dist/main')
const { prop, inc, ifElse, has } = require('ramda')

const test = require('ava')

// Maybe

test('Maybe test', t => {
  const ma = { x: 10 }

  const addToObject = compose(
    map(inc),
    map(prop('x')),
    Maybe.of
  )

  const test = addToObject(ma).inspect()
  const test2 = addToObject({ y: 11 }).inspect()

  t.is(test, 'Just(11)')
  t.is(test2, 'Nothing()')
})

// Either

test('Either test', t => {
  const getAndAdd = compose(
    map(inc),
    map(prop('x')),
    ifElse(has('x'), Either.Right, Either.Left)
  )

  const test = getAndAdd({ x: 10 }).inspect()
  const test2 = getAndAdd({ y: 10 }).inspect()

  t.is(test, 'Right(11)')
  t.is(test2, 'Left([object Object])')
})

// IO

test('IO monad', t => {
  const callToServer = x => {
    console.log('Effect run')
  }

  const makeChangesToDOM = x => {
    console.log('Effect run')
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

  const test = impureComputation(10).run()

  t.is(test, 10)
})

// Future

test('Future Monad', async t => {
  const apiCall = x =>
    Future((_, resolve) => {
      setTimeout(_ => resolve({ a: x }), 500)
    })

  const asyncComp = compose(
    map(inc),
    map(prop('a')),
    apiCall
  )

  const futureTest = future =>
    new Promise(resolve => {
      future.value(resolve)
    })

  const test = await futureTest(asyncComp(10))

  t.is(test, 11)
})

// Pair

test('Pair', t => {
  const test = Pair(10, 11)
  const fTest = test.map(inc)
  const mTest = test.chain(({ value, state }) => Pair(value, state + 1))

  t.is(test.fst(), 10) // Do not test the abstraction
  t.is(test.snd(), 11)
  t.is(fTest.snd(), 12) // Functor
  t.is(mTest.snd(), 12) // Monad
})

// // State

// const comp1 = x => x + ' Comp1'

// const comp2 = x => x + ' Comp2'

// const sa = compose(
//   map(comp2),
//   map(comp1),
//   State.of
// )

// console.log(sa('Yo').eval())

// // Reader

// const getConfig = x => map(config => config + x, Reader.ask)

// const ra = compose(
//   chain(getConfig),
//   map(inc),
//   map(prop('x')),
//   Reader.of
// )

// const res = ra({ x: 10 }).run('This is config') // added config

// console.log(res)

// // do

// const da = Do(function*() {
//   const a = yield getAndAdd({ x: 1000000000 }) // Either
//   const b = yield addToObject({ x: 2000000000 }) // Maybe
//   const c = yield impure1(10) // IO
//   const d = yield Future.of(99) // Future
//   yield a + b + c + d
// })

// console.log(da)

// // Async Do

// const ada = AsyncDo(function*() {
//   const a = yield asyncComp(20)
//   const b = yield asyncComp(20)
//   return a + b
// })

// ada.fork(console.error, console.log)
