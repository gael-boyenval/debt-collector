import { describe, it, expect } from 'vitest'
import { useArrayForStringKeys } from './useArrayForStringKeys.js'

describe('useArrayForStringKeys', () => {
  it('should convert string values to arrays', () => {
    const keys = ['key1', 'key2']
    const obj = {
      key1: 'value1',
      key2: 'value2',
    }
    const result = useArrayForStringKeys(keys, obj)
    expect(result).toEqual({
      key1: ['value1'],
      key2: ['value2'],
    })
  })

  it('should handle empty keys array', () => {
    const keys: string[] = []
    const obj = {}
    const result = useArrayForStringKeys(keys, obj)
    expect(result).toEqual({})
  })

  it('should handle non-existent keys', () => {
    const keys = ['key1', 'key2']
    const obj = {}
    const result = useArrayForStringKeys(keys, obj)
    expect(result).toEqual({
      key1: [],
      key2: [],
    })
  })

  it('should handle undefined values', () => {
    const keys = ['key1']
    const obj = {
      key1: undefined,
    }
    const result = useArrayForStringKeys(keys, obj)
    expect(result).toEqual({
      key1: [],
    })
  })

  it('should handle null values', () => {
    const keys = ['key1']
    const obj = {
      key1: null,
    }
    const result = useArrayForStringKeys(keys, obj)
    expect(result).toEqual({
      key1: [],
    })
  })

  it('should handle array values', () => {
    const keys = ['key1']
    const obj = {
      key1: ['value1', 'value2'],
    }
    const result = useArrayForStringKeys(keys, obj)
    expect(result).toEqual({
      key1: ['value1', 'value2'],
    })
  })
})
