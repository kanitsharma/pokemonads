import { K, I, compose } from '@pokemonads/combinators'

const Reader = Fn => {
  const run = x => Fn(x)
  const map = g =>
    Reader(
      compose(
        g,
        run
      )
    )
  const chain = g =>
    Reader(config =>
      compose(
        x => x.run(config),
        g,
        run
      )(config)
    )
  const ap = a => chain(a.map)

  return { run, map, chain, ap }
}

Reader.of = compose(
  Reader,
  K
)
Reader.ask = Reader(I)

export default Reader
