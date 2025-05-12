import { describe, it, expect } from 'vitest'
import { getConfigRuleById } from './getConfigRuleById.js'
import type { Config, SanitizedFileRule } from '../types.js'

describe('getConfigRuleById', () => {
  const mockConfig: Config = {
    include: ['**/*.ts'],
    exclude: [],
    fileRules: [
      {
        id: 'rule1',
        title: 'Rule 1',
        debtScore: 1,
        include: ['**/*.ts'],
        matchRule: () => 1,
      },
      {
        id: 'rule2',
        title: 'Rule 2',
        debtScore: 2,
        include: ['**/*.tsx'],
        matchRule: () => 1,
      },
    ] as SanitizedFileRule[],
  }

  it('should return rule when ID exists', () => {
    const result = getConfigRuleById(mockConfig, 'rule1')
    expect(result).toEqual(mockConfig.fileRules![0])
  })

  it('should return undefined when ID does not exist', () => {
    const result = getConfigRuleById(mockConfig, 'nonexistent')
    expect(result).toBeUndefined()
  })

  it('should handle empty fileRules array', () => {
    const configWithoutRules = {
      ...mockConfig,
      fileRules: [] as SanitizedFileRule[],
    }
    const result = getConfigRuleById(configWithoutRules, 'rule1')
    expect(result).toBeUndefined()
  })

  it('should handle undefined fileRules', () => {
    const configWithoutRules = { ...mockConfig, fileRules: undefined }
    const result = getConfigRuleById(configWithoutRules, 'rule1')
    expect(result).toBeUndefined()
  })
})
