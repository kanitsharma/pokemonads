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

### Either

Either (or the disjunct union) is a type that can either hold a value of type A or a value of type B but never at the same time. Typically it is used to represent computations that can fail with an error. Think of it as a better way to handle exceptions. We think of an Either as having two sides, the success is held on the right and the failure on the left. This is a right biased either which means that map and flatMap (bind) will operate on the right side of the either.

### IO

The IO monad is for isolating effects to maintain referential transparency in your software. Essentially you create a description of your effects of which is performed as the last action in your programme. The IO is lazy and will not be evaluated until the perform (alias run) method is called.

### Future

Fluture offers a control structure similar to Promises, Tasks, Deferreds, and what-have-you.

Much like Promises, Futures represent the value arising from the success or failure of an asynchronous operation (I/O). Though unlike Promises, Futures are lazy and adhere to the monadic interface.

### Pair

Pair allows the ability to represent two distinct values of different types.

As Pair is a Bifunctor, it can vary in each of the two types it represents. When used as a normal Functor, Pair will always have a bias for the far right or second value,

### State

State is an Algebraic Data Type that abstracts away the associated state management that comes with stateful computations.State is parameterized by two types, a state S and a resultant A. The resultant portion may vary it's type, but the state portion must be fixed to a type that is used by all related stateful computations.

### Reader

The Reader monad is a wonderful solution to inject dependencies into your functions.

The Reader monad provides a way to "weave" your configuration throughout your programme.
