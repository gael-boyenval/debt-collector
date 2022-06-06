const useArrayForStringKeys = (keys: string[], obj: any) => {
  const returnObj = obj

  keys.forEach((key) => {
    if (returnObj[key] && typeof returnObj[key] === 'string') {
      returnObj[key] = [returnObj[key]]
    }
    if (!returnObj[key]) {
      returnObj[key] = []
    }
  })

  return returnObj
}
export default useArrayForStringKeys
