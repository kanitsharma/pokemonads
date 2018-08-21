import {
  K,
  I,
  compose,
  run as Run,
  map as Map,
  flip
} from '@pokemonads/combinators'

const Reader = Fn => {
  const run = x => Fn(x)

  // Funtor :: (a -> b) -> Fa -> Fb
  const map = g =>
    Reader(
      compose(
        g,
        run
      )
    )

  // Chain :: (a -> Mb) -> Ma -> Mb
  const chain = g =>
    Reader(config =>
      compose(
        Run(config),
        g,
        run
      )(config)
    )

  // Applicative ap :: ma -> mb -> mab
  const ap = compose(
    chain,
    flip(Map)
  )

  return { run, map, chain, ap }
}

Reader.of = compose(
  Reader,
  K
)
Reader.ask = Reader(I)

export default Reader
