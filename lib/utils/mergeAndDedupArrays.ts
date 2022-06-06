const mergeAndDedupArrays = <T>(...args: T[][]): T[] => {
  const fusioned: T[] = args.reduce((acc, array) => acc.concat(array), [])
  return [...new Set(fusioned)]
}

export default mergeAndDedupArrays
