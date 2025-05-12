import { describe, it, expect } from 'vitest'
import { getTagListFromConfig } from './getTagListFromConfig.js'
import type { Config } from '../types.js'

describe('getTagListFromConfig', () => {
  it('should return empty object when no rules are provided', () => {
    const config: Config = {
      include: ['**/*.ts'],
      exclude: [],
      fileRules: [],
    }
    const result = getTagListFromConfig(config)
    expect(result).toEqual({})
  })

  it('should return empty object when no tags are provided', () => {
    const config: Config = {
      include: ['**/*.ts'],
      exclude: [],
      fileRules: [
        {
          id: 'RULE_1',
          title: 'Test Rule',
          debtScore: 1,
          include: ['**/*.ts'],
          matchRule: () => 0,
        },
      ],
    }
    const result = getTagListFromConfig(config)
    expect(result).toEqual({})
  })

  it('should group rules by tags', () => {
    const config: Config = {
      include: ['**/*.ts'],
      exclude: [],
      fileRules: [
        {
          id: 'RULE_1',
          title: 'Test Rule 1',
          debtScore: 1,
          tags: ['tag1', 'tag2'],
          include: ['**/*.ts'],
          matchRule: () => 0,
        },
        {
          id: 'RULE_2',
          title: 'Test Rule 2',
          debtScore: 1,
          tags: ['tag2', 'tag3'],
          include: ['**/*.ts'],
          matchRule: () => 0,
        },
      ],
    }
    const result = getTagListFromConfig(config)
    expect(result).toEqual({
      tag1: ['RULE_1'],
      tag2: ['RULE_1', 'RULE_2'],
      tag3: ['RULE_2'],
    })
  })

  it('should handle duplicate rule IDs in tags', () => {
    const config: Config = {
      include: ['**/*.ts'],
      exclude: [],
      fileRules: [
        {
          id: 'RULE_1',
          title: 'Test Rule 1',
          debtScore: 1,
          tags: ['tag1'],
          include: ['**/*.ts'],
          matchRule: () => 0,
        },
        {
          id: 'RULE_1',
          title: 'Test Rule 1',
          debtScore: 1,
          tags: ['tag1'],
          include: ['**/*.ts'],
          matchRule: () => 0,
        },
      ],
    }
    const result = getTagListFromConfig(config)
    expect(result).toEqual({
      tag1: ['RULE_1'],
    })
  })
})
