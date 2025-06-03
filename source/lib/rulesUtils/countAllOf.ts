import type { MatchPattern } from '../types.js'
import { countAll } from './countAll.js'

export const countAllOf =
  (data: string) =>
  (matches: MatchPattern[]): number => {
    let count = 0
    let index = 0

    while (index <= matches.length - 1) {
      count += countAll(data)(matches[index] as MatchPattern)
      index += 1
    }

    return count
  }
