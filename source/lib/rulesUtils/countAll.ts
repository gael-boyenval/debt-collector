import escapeStringRegexp from 'escape-string-regexp-node'
import type { MatchPattern } from '../types.js'

export const countAll =
  (data: string) =>
  (str: MatchPattern): number => {
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