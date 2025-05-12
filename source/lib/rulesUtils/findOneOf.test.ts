import { describe, it, expect } from 'vitest'
import { findOneOf } from './findOneOf.js'

describe('findOneOf', () => {
  it('should return 1 when at least one pattern matches', () => {
    const data = 'test1 test2'
    const result = findOneOf(data)(['test1', 'test2'])
    expect(result).toBe(1)
  })

  it('should return 0 when no patterns match', () => {
    const data = 'no matches here'
    const result = findOneOf(data)(['test1', 'test2'])
    expect(result).toBe(0)
  })

  it('should work with RegExp patterns', () => {
    const data = 'test1 test2'
    const result = findOneOf(data)([/\btest1\b/g, /\btest2\b/g])
    expect(result).toBe(1)
  })
}) 