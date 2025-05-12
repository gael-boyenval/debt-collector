export const mergeAndDedupArrays = <T>(arrays: T[][]): T[] => {
  const fusioned: T[] = arrays.flat()
  return [...new Set(fusioned)]
}
