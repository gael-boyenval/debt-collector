const truncateString = (str: string, max: number): string => {
  if (str.length < max) return str
  const charArr = str.split('')
  const strStart = [...charArr].filter((_char, i) => i >= 0 && i < max / 2)
  const strEnd = [...charArr].filter(
    (_char, i) => i > str.length - max / 2 && i < str.length
  )
  return [...strStart, '....', ...strEnd].join('')
}

export default truncateString
