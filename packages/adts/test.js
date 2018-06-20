const { Maybe, Either, State } = require('./dist/main')

// Maybe.of(undefined).map(console.log)
// Maybe.of(10).map(console.log)

// Either.Right(10)
//   .map(x => undefined)
//   .map(console.log)

const res = State.put(10)

const res2 = res.exec()

const res3 = res.exec()

const res4 = res.map(x => x * 10)

const res5 = res.inspect()

console.log(res, res2, res3, res4, res5)
