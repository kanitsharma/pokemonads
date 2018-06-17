const { Maybe, Either } = require('./dist/main')

Maybe.of(undefined).map(console.log)
Maybe.of(10).map(console.log)

Either.of(10)
  .map(x => undefined)
  .map(console.log)
