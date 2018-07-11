const iterate = (itr, fn) => {
  let x, Return

  fn(val => {
    Return = val
    x = itr.next(val)
    console.log(x)
  })

  if (x.done) {
    return Return
  }

  if (typeof x.value === 'object' && 'fork' in x.value) {
    return iterate(itr, fn => x.value.fork(x => x, x => fn(x)))
  }

  if (typeof x.value === 'object' && 'run' in x.value) {
    return iterate(itr, fn => x.value.map(x => fn(x)).run())
  }

  if (typeof x.value === 'object' && 'chain' in x.value) {
    return iterate(itr, fn => x.value.chain(x => fn(x)))
  }

  if (typeof x.value !== 'object') {
    return iterate(itr, fn => fn(x.value))
  }
}

const d = f => {
  const itr = f()
  const a = iterate(itr, fn => fn(null))
  return a
}

export default d
