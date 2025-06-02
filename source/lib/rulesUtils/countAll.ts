import escapeStringRegexp from 'escape-string-regexp-node'
import type { MatchPattern } from '../types.js'

export const countAll =
  (data: string) =>
  (str: MatchPattern): number => {
    let regexp: RegExp

    if (str instanceof RegExp) {
      const flags = str.flags.includes('g') ? str.flags : str.flags + 'g'
      regexp = new RegExp(str.source, flags)
    } else {
      regexp = new RegExp(escapeStringRegexp(str), 'g')
    }
    const res = data.matchAll(regexp)
    const resArr = Array.from(res, (m) => m[0])

    return resArr.length
  }
