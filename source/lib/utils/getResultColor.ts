export const getResultColor = (nb: number) => {
  if (nb > 0) return 'red'
  if (nb < 0) return 'green'
  return 'grey'
}
