import { describe, it, expect } from 'vitest'
import { cleanTagFilterParam } from './cleanTagFilterParam.js'

describe('cleanTagFilterParam', () => {
  it('should clean tag filter parameter', () => {
    const input = ['tag1', 'tag2', 'tag3']
    const result = cleanTagFilterParam(input)
    expect(result).toEqual(['tag1', 'tag2', 'tag3'])
  })

  it('should handle empty array', () => {
    const input: (string | undefined)[] = []
    const result = cleanTagFilterParam(input)
    expect(result).toEqual([])
  })

  it('should handle undefined input', () => {
    const input: (string | undefined)[] | undefined = undefined
    const result = cleanTagFilterParam(input)
    expect(result).toEqual([])
  })

  it('should handle array input', () => {
    const input = ['tag1', 'tag2']
    const result = cleanTagFilterParam(input)
    expect(result).toEqual(['tag1', 'tag2'])
  })

  it('should filter out undefined tags', () => {
    const input: (string | undefined)[] = ['tag1', undefined, 'tag3']
    const result = cleanTagFilterParam(input)
    expect(result).toEqual(['tag1', 'tag3'])
  })

  it('should trim whitespace from tags', () => {
    const input: (string | undefined)[] = [' tag1 ', ' tag2 ', ' tag3 ']
    const result = cleanTagFilterParam(input)
    expect(result).toEqual(['tag1', 'tag2', 'tag3'])
  })
})
