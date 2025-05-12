import { describe, it, expect } from 'vitest'
import { mergeAndDedupArrays } from './mergeAndDedupArrays.js'

describe('mergeAndDedupArrays', () => {
  it('should merge and deduplicate arrays', () => {
    const arr1 = ['a', 'b', 'c']
    const arr2 = ['b', 'c', 'd']
    const arr3 = ['d', 'e', 'f']

    const result = mergeAndDedupArrays([arr1, arr2, arr3])
    expect(result).toEqual(['a', 'b', 'c', 'd', 'e', 'f'])
  })

  it('should handle empty arrays', () => {
    const result = mergeAndDedupArrays([[], [], []])
    expect(result).toEqual([])
  })

  it('should handle single array', () => {
    const arr = ['a', 'b', 'c']
    const result = mergeAndDedupArrays([arr])
    expect(result).toEqual(arr)
  })

  it('should handle arrays with duplicates within themselves', () => {
    const arr1 = ['a', 'a', 'b']
    const arr2 = ['b', 'b', 'c']
    const result = mergeAndDedupArrays([arr1, arr2])
    expect(result).toEqual(['a', 'b', 'c'])
  })
})
