import escapeStringRegexp from 'escape-string-regexp-node'
import type { Config, BrokenRule } from '../types'

const findJsImportFrom =
  (data) =>
  (importee?: string, from?: string): 0 | 1 => {
    const regexp = new RegExp(
      `import [A-z0-9,\\s{]*${escapeStringRegexp(
        importee
      )}[A-z0-9,\\s}]* from '[A-z0-9.\/]*${escapeStringRegexp(
        from
      )}[A-z0-9.\/]*'`,
      'gm'
    )
    const res = data.matchAll(regexp)
    const resArr = Array.from(res, (m) => m[0])
    return resArr.length > 0 ? 1 : 0
  }

const countAll =
  (data) =>
  (str: string | RegExp): number => {
    let regexp: RegExp

    if (str instanceof RegExp) {
      regexp = str
    } else {
      regexp = new RegExp(escapeStringRegexp(str), 'g')
    }
    const res = data.matchAll(regexp)
    const resArr = Array.from(res, (m) => m[0])

    return resArr.length
  }

const findOne =
  (data) =>
  (str: string | RegExp): 0 | 1 => {
    const count = countAll(data)(str)
    return count > 0 ? 1 : 0
  }

const findOneOf =
  (data) =>
  (matches: (string | RegExp)[]): 0 | 1 => {
    let count = 0
    let index = 0

    while (count === 0 && index <= matches.length - 1) {
      count = countAll(data)(matches[index])
      index += 1
    }

    return count === 0 ? 0 : 1
  }

const countAllOf =
  (data) =>
  (matches: (string | RegExp)[]): number => {
    let count = 0
    const index = 0

    while (index <= matches.length - 1) {
      count += countAll(data)(matches[index])
    }

    return count
  }

const getFileRulesErrors = (
  config: Config,
  file: string,
  data: string
): BrokenRule[] => {
  const directoryDepth = file.replace('./').split('/')
  directoryDepth.splice(-1)

  const utils = {
    directoryDepth: directoryDepth.length,
    content: data,
    file,
    countAll: countAll(data),
    findOne: findOne(data),
    findOneOf: findOneOf(data),
    countAllOf: countAllOf(data),
    findJsImportFrom: findJsImportFrom(data),
  }

  return config.fileRules.reduce((acc, rule) => {
    const nbErrors = rule.matchRule({ ...utils })

    if (nbErrors > 0) {
      acc.push({
        ruleTitle: rule.title,
        ruleId: rule.id,
        occurences: nbErrors,
      })
    }
    return acc
  }, [])
}

export default getFileRulesErrors
