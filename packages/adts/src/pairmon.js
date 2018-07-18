import { K } from '../../combinators/src'

const Pair = (value, state) => {
  const fst = K(value)
  const snd = K(state)
  // Funtor :: Fa -> (a -> b) -> Fb
  const map = fn => Pair(value, fn(state))
  // Chain :: Ma -> (a -> Mb) -> Mb
  const chain = fn => fn({ value, state })
  // Bimap :: Fab -> (a -> c) -> (b -> d) -> Fcd
  const bimap = (f, g) => Pair(f(value), g(state))

  return { fst, snd, map, chain, bimap, value, state }
}

export default Pair
