import { describe, it, expect } from 'vitest'
import { truncateString } from './truncateString.js'

describe('truncateString', () => {
  it('should return the original string if length is less than max', () => {
    const str = 'Hello World'
    const max = 20
    expect(truncateString(str, max)).toBe(str)
  })

  it('should truncate string with ellipsis in the middle when length exceeds max', () => {
    const str = 'This is a very long string that needs to be truncated'
    const max = 20
    const result = truncateString(str, max)
    expect(result).toMatchInlineSnapshot(`"This is a ....truncated"`)
  })

  it('should handle empty string', () => {
    expect(truncateString('', 10)).toBe('')
  })

  it('should handle string with length equal to max', () => {
    const str = '1234567890'
    const max = 10
    expect(truncateString(str, max)).toMatchInlineSnapshot(`"12345....7890"`)
  })

  it('should handle very small max length', () => {
    const str = 'Hello'
    const max = 3
    const result = truncateString(str, max)
    expect(result).toMatchInlineSnapshot(`"He....o"`)
  })

  it('should handle file paths', () => {
    const filePath =
      '/Users/john/Documents/project/src/Documents/project/src/components/Button.tsx'
    const max = 50
    const result = truncateString(filePath, max)
    expect(result).toMatchInlineSnapshot(
      `"/Users/john/Documents/pro....rc/components/Button.tsx"`
    )
  })
})
