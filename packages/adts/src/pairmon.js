import { K } from '@pokemonads/combinators'

const Pair = (value, state) => {
  // fs :: K value
  const fst = K(value)
  // snd :: K state
  const snd = K(state)
  // Funtor :: (a -> b) -> Fa -> Fb
  const map = fn => Pair(value, fn(state))
  // Chain :: (a -> Mb) -> Ma -> Mb
  const chain = fn => fn({ value, state })
  // Bimap :: (a -> b) (c -> d) -> Fac -> Fbd
  const bimap = (f, g) => Pair(f(value), g(state))

  return { fst, snd, map, chain, bimap, value, state }
}

export default Pair
