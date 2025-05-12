export const useArrayForStringKeys = <K extends string, T extends { [P in K]?: string | string[] | undefined | null } & Record<string, any>>(
  keys: K[],
  obj: T
): { [P in K]: string[] } & Omit<T, K> => {
  const returnObj = { ...obj } as T
  
  keys.forEach((key) => {
    if (returnObj[key] && typeof returnObj[key] === 'string') {
      (returnObj[key] as any) = [returnObj[key]]
    }
    if (!returnObj[key]) {
      (returnObj[key] as any) = []
    }
  })

  return returnObj as { [P in K]: string[] } & Omit<T, K>
}
