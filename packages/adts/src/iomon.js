import { compose } from '@pokemonads/combinators'

const IO = g => {
  // Funtor :: (a -> b) -> Fa -> Fb
  const map = f =>
    IO(_ =>
      compose(
        f,
        g
      )()
    )

  // Chain :: (a -> Mb) -> Ma -> Mb
  const chain = f =>
    IO(_ =>
      compose(
        f,
        g
      )().run()
    )

  // Applicative ap :: ma -> mb -> mab
  const ap = a => chain(a.map)

  const run = _ => g()

  return { map, chain, ap, run }
}

IO.of = f => IO(f)
IO.print = x => {
  console.log(x)
  return x
}

export default IO
