import { describe, it, expect } from 'vitest'
import { countAll } from './countAll.js'

describe('countAll', () => {
  it('should count string occurrences', () => {
    const data = 'test test test'
    const result = countAll(data)('test')
    expect(result).toBe(3)
  })

  it('should work with RegExp', () => {
    const data = 'test1 test2 test3'
    const result = countAll(data)(/\btest\d\b/g)
    expect(result).toBe(3)
  })

  it('should return 0 when no matches found', () => {
    const data = 'no matches here'
    const result = countAll(data)('test')
    expect(result).toBe(0)
  })
}) 