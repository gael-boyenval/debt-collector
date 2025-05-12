import type { MatchPattern } from '../types.js'
import { countAll } from './countAll.js'

export const findOne =
  (data: string) =>
  (str: MatchPattern): 0 | 1 => {
    const count = countAll(data)(str)
    return count > 0 ? 1 : 0
  } 