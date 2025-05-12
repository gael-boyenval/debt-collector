import type { MatchPattern } from '../types.js'
import { countAll } from './countAll.js'

export const findOneOf =
  (data: string) =>
  (matches: (MatchPattern)[]): 0 | 1 => {
    let count = 0
    let index = 0

    while (count === 0 && index <= matches.length - 1) {
      count = countAll(data)(matches[index] as MatchPattern)
      index += 1
    }

    return count === 0 ? 0 : 1
  } 