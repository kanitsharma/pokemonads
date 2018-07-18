# Pokemonads

[<img src="https://raw.github.com/fantasyland/fantasy-land/master/logo.png" align="right" width="82" height="82" alt="Fantasy Land" />](https://github.com/fantasyland/fantasy-land/)

Pokemonads is a collection of common algebraic data types and combinators which are compatible with [Fantasy Land](https://github.com/fantasyland/fantasy-land/)

## Fistful of monads and more ✊

“Once you understand monads, you immediately become incapable of explaining them to anyone else” Lady Monadgreen’s curse ~ Gilad Bracha (used famously by Douglas Crockford)

A monad is a way of composing functions that require context in addition to the return value, such as computation, branching, or I/O. Monads type lift, flatten and map so that the types line up for lifting functions a => M(b), making them composable. It's a mapping from some type a to some type b along with some computational context, hidden in the implementation details of lift, flatten, and map:

- Functions map: `a => b`
- Functors map with context: `Functor(a) => Functor(b)`
- Monads flatten and map with context: `Monad(Monad(a)) => Monad(b)`

Why do we need monads? [here](https://stackoverflow.com/questions/28139259/why-do-we-need-monads) is a great explanation

## [See examples](https://github.com/kanitsharma/pokemonads/blob/master/packages/adts/readme.md)

## Installation

#### ADTs -> Contains all basic monads

```javascript
  npm i -s @pokemonads/adts
  // or
  yarn add @pokemonads/adts
```

#### Combinators -> A collection of basic combinators and utilities

```javascript
  npm i -s @pokemonads/combinators
  // or
  yarn add @pokemonads/combinators
```
