import escapeStringRegexp from 'escape-string-regexp-node'

const getFileRulesErrors = (config, file, data) => {
  const directoryDepth = file.replace('./').split('/')
  directoryDepth.splice(-1)

  const isImportingFrom = (str) => {
    const regexp = new RegExp(escapeStringRegexp(`from '${str}`), 'g')
    const res = data.matchAll(regexp)
    const resArr = Array.from(res, m => m[0])

    return resArr.length
  }
  
  const find = (str) => {
    const regexp = new RegExp(escapeStringRegexp(str), 'g')
    const res = data.matchAll(regexp)
    const resArr = Array.from(res, m => m[0])

    return resArr.length
  }
  
  const utils = {
    directoryDepth: directoryDepth.length,
    content: data,
    isImportingFrom,
    find,
  }
      
  return config.fileRules.reduce((acc, rule) => {    
    const nbErrors = rule.matchRule({...utils})

    if (nbErrors > 0) {
      return [
        ...acc,
        {
          resultId: rule.id,
          occurences: nbErrors
        }
      ]
    } else {
      return acc
    }
  }, [])
}

export default getFileRulesErrors