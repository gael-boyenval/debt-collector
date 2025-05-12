import { describe, it, expect } from 'vitest'
import { findOne } from './findOne.js'

describe('findOne', () => {
  it('should return 1 when at least one match found', () => {
    const data = 'test test test'
    const result = findOne(data)('test')
    expect(result).toBe(1)
  })

  it('should return 0 when no matches found', () => {
    const data = 'no matches here'
    const result = findOne(data)('test')
    expect(result).toBe(0)
  })

  it('should work with RegExp', () => {
    const data = 'test1 test2'
    const result = findOne(data)(/\btest\d\b/g)
    expect(result).toBe(1)
  })
}) 