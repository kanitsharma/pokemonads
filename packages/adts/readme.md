# Pokemonads/adts

Pokemonads is a collection of common algebraic data types which are compatible with [Fantasy Land](https://github.com/fantasyland/fantasy-land/)

documentation coming up soon :)

Visit our [github page](https://github.com/kanitsharma/pokemonads) for more information.

## Installation

```javascript
  npm i -s @pokemonads/adts
  // or
  yarn add @pokemonads/adts
```

## Implements

### Maybe

The Maybe type is the most common way of representing nothingness (or the null type) with making the possibilities of NullPointer issues disappear.

Maybe is effectively abstract and has two concrete subtypes: Some (also Just) and None (also Nothing).

#### Example

```javascript
import { Maybe } from '@pokemonads/adts'
import { compose, map } from '@pokemonads/combinators'
import { prop, inc } from 'ramda'

const a = { x: 10 }
const b = { z: 'no x here' }

const addToObject = compose(
  map(inc),
  map(prop('x')),
  Maybe.of
)

console.log(addToObject(a)) // Just(11)
console.log(addToObject(b)) // Nothing()
```

### Either

Either (or the disjunct union) is a type that can either hold a value of type A or a value of type B but never at the same time. Typically it is used to represent computations that can fail with an error. Think of it as a better way to handle exceptions. We think of an Either as having two sides, the success is held on the right and the failure on the left. This is a right biased either which means that map and chain (flatMap) will operate on the right side of the either.

```javascript
import { Either } from '@pokemonads/adts'
import { compose, map } from '@pokemonads/combinators'
import { prop, has, inc } from 'ramda'

const getAndAdd = compose(
  map(inc),
  map(prop('x')),
  ifElse(has('x'), Either.Right, Either.Left)
)

console.log(getAndAdd({ x: 10 })) // Right({ x: 11 })
console.log(getAndAdd({ y: 10 })) // Left({ y: 10 })
```

### IO

The IO monad is for isolating effects to maintain referential transparency in your software. Essentially you create a description of your effects of which is performed as the last action in your programme. The IO is lazy and will not be evaluated until the perform (alias run) method is called.

```javascript
import { IO } from '@pokemonads/adts'
import { composeK } from '@pokemonads/combinators'

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
```

### Future

Future offers a control structure similar to Promises, Tasks, Deferreds, and what-have-you.

Much like Promises, Futures represent the value arising from the success or failure of an asynchronous operation (I/O). Though unlike Promises, Futures are lazy and adhere to the monadic interface.

```javascript
import { Future } from '@pokemonads/adts'
import { compose, map } from '@pokemonads/combinators'
import { prop, inc } from 'ramda'

const apiCall = x =>
  Future((_, resolve) => {
    setTimeout(_ => resolve({ a: x }), 500)
  })

const asyncComp = compose(
  map(inc),
  map(prop('a')),
  apiCall
)

const cancel = asyncComp(10).value(console.log)
```

### Pair

Pair allows the ability to represent two distinct values of different types.

As Pair is a Bifunctor, it can vary in each of the two types it represents. When used as a normal Functor, Pair will always have a bias for the far right or second value,

```javascript
import { Pair } from '@pokemonads/adts'

const a = Pair(10, 11)
console.log(a.fst(), a.snd())
```

### State

State is an Algebraic Data Type that abstracts away the associated state management that comes with stateful computations.State is parameterized by two types, a state S and a resultant A. The resultant portion may vary it's type, but the state portion must be fixed to a type that is used by all related stateful computations.

```javascript
import { State } from '@pokemonads/adts'

const comp1 = x => x + ' Comp1'

const comp2 = x => x + ' Comp2'

const sa = compose(
  map(comp2),
  map(comp1),
  State.of
)

console.log(sa('Yo').eval())
```

### Reader

The Reader monad is a wonderful solution to inject dependencies into your functions.

The Reader monad provides a way to "weave" your configuration throughout your programme.

```javascript
import { Reader } from '@pokemonads/adts'
import { compose, map, chain } from '@pokemonads/combinators'
import { prop, inc } from 'ramda'

const getConfig = x => map(config => config + ' ' + x, Reader.ask)

const ra = compose(
  chain(getConfig),
  map(inc),
  map(prop('x')),
  Reader.of
)

const res = ra({ x: 10 }).run('This is config') // added config

console.log(res) // This is config 11
```
