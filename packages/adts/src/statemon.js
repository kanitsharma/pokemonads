// State Monad
// State -> Pair(a, s)
import Pair from './pairmon'

const State = st => ({
  // runState :: a -> State
  runState: x => st(x),
  // Functor map :: (a -> b) -> fa -> fb
  map: f =>
    State(x => {
      const { value, state } = st(x)
      return Pair(f(value), state)
    }),
  // Monad chain :: (a -> mb) -> ma -> mb
  chain: f =>
    State(s => {
      const { value, state } = st(s)
      return f(value).runState(state)
    }),
  // Applicative ap :: ma -> mb -> mab
  ap: state =>
    State(s => {
      const { value, state } = st(s)
      const { value2, state2 } = state.runState(state)
      return Pair(value(value2), state2)
    }),
  // get :: () -> State
  get: () =>
    State(s => {
      const { state } = st(s)
      return Pair(state, state)
    }),
  // modify :: (a -> b) -> State
  modify: f => State(s => Pair(undefined, f(s))),
  // put :: State -> State
  put: s =>
    State(ss => {
      const { value } = st(ss)
      return Pair(value, s)
    }),
  // push :: () -> State
  push: () =>
    State(ss => {
      const { value } = st(ss)
      return Pair(value, value)
    }),
  // then :: (a -> b) -> State
  then: f =>
    State(s => {
      const { value, state } = st(s)
      const res = f(value)
      return res.runState ? res.runState(state) : Pair(res, state)
    }),
  withState: f => State(s => Pair(f(...st(s)), s)),
  exec: x => st(x).state,
  eval: x => st(x).value,
  extract: () => st,
  inspect: () => st().toString()
})

State.of = x => State(s => Pair(x, s))
State.get = () => State(s => Pair(s, s))
State.put = v => State(_ => Pair(v, v))

export default State
