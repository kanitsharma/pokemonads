import IO from './iomon'

const flatten = arr => (typeof arr[0] === 'object' ? flatten(arr[0]) : arr[0])

const iterate = (itr, val) =>
  [itr.next(val)].map(
    x =>
      !x.done
        ? typeof x.value === 'object' && 'chain' in x.value
          ? 'run' in x.value
            ? x.value.chain(y => IO(_ => iterate(itr, y))).run()
            : x.value.chain(y => iterate(itr, y))
          : iterate(itr, x.value)
        : val
  )

const d = f => {
  const itr = f()
  const a = iterate(itr)
  return flatten(a)
}

export default d
