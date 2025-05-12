import { describe, it, expect } from 'vitest'
import { countAllOf } from './countAllOf.js'

describe('countAllOf', () => {
  it('should count total occurrences of all patterns', () => {
    const data = 'test1 test2 test1'
    const result = countAllOf(data)(['test1', 'test2'])
    expect(result).toBe(3)
  })

  it('should return 0 when no patterns match', () => {
    const data = 'no matches here'
    const result = countAllOf(data)(['test1', 'test2'])
    expect(result).toBe(0)
  })

  it('should work with RegExp patterns', () => {
    const data = 'test1 test2 test1'
    const result = countAllOf(data)([/\btest1\b/g, /\btest2\b/g])
    expect(result).toBe(3)
  })
}) 