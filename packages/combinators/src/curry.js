const curry = fn => {
  const curryN = (n, fn) => (...args) =>
    args.length >= n
      ? fn(...args)
      : curryN(n - args.length, (...innerArgs) => fn(...args, ...innerArgs))

  return curryN(fn.length, fn)
}

export default curry
