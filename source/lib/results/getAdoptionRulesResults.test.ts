import { describe, it, expect } from 'vitest'
import getAdoptionRulesResults from './getAdoptionRulesResults.js'
import { createMatchRuleUtils } from '../rulesUtils/index.js'
import type { Config, SanitizedFileRule } from '../types.js'

const makeUtils = (content: string) => createMatchRuleUtils('test.ts', content)

describe('getAdoptionRulesResults', () => {
  const mockConfig: Config = {
    include: ['**/*.ts'],
    exclude: [],
    adoptionRules: [
      {
        id: 'adopt-rule-1',
        title: 'Adopt Rule 1',
        debtScore: 1,
        include: ['**/*.ts'],
        matchRule: ({ findOne }) => findOne('adopt'),
      } as SanitizedFileRule,
      {
        id: 'adopt-rule-2',
        title: 'Adopt Rule 2',
        debtScore: 1,
        include: ['**/*.ts'],
        matchRule: ({ countAll }) => countAll('import'),
      } as SanitizedFileRule,
    ],
  }

  it('should return empty array when no adoption rules match', () => {
    const result = getAdoptionRulesResults(mockConfig, makeUtils('This is a sample file without any matches'))
    expect(result).toEqual([])
  })

  it('should detect adoption rules and return them with occurrences', () => {
    const result = getAdoptionRulesResults(mockConfig, makeUtils('This is an adopt file with adopt and import'))
    expect(result).toHaveLength(2)
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'adopt-rule-1',
          ruleTitle: 'Adopt Rule 1',
          occurences: 1,
        }),
        expect.objectContaining({
          ruleId: 'adopt-rule-2',
          ruleTitle: 'Adopt Rule 2',
          occurences: 1,
        }),
      ])
    )
  })

  it('should handle empty config', () => {
    const emptyConfig: Config = { include: ['**/*.ts'], exclude: [] }
    const result = getAdoptionRulesResults(emptyConfig, makeUtils('content'))
    expect(result).toEqual([])
  })

  it('should handle config with no adoptionRules', () => {
    const configWithoutRules: Config = {
      include: ['**/*.ts'],
      exclude: [],
      adoptionRules: undefined,
    }
    const result = getAdoptionRulesResults(configWithoutRules, makeUtils('content'))
    expect(result).toEqual([])
  })

  it('should count multiple occurrences correctly', () => {
    const result = getAdoptionRulesResults(mockConfig, makeUtils('adopt adopt adopt import import'))
    expect(result).toHaveLength(2)
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ ruleId: 'adopt-rule-1', occurences: 1 }),
        expect.objectContaining({ ruleId: 'adopt-rule-2', occurences: 2 }),
      ])
    )
  })

  it('should handle findJsImportFrom utility', () => {
    const configWithImport: Config = {
      include: ['**/*.ts'],
      exclude: [],
      adoptionRules: [
        {
          id: 'import-rule',
          title: 'Import Rule',
          debtScore: 1,
          include: ['**/*.ts'],
          matchRule: ({ findJsImportFrom }) => findJsImportFrom('React', 'react'),
        } as SanitizedFileRule,
      ],
    }
    const result = getAdoptionRulesResults(configWithImport, makeUtils("import React from 'react'"))
    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(
      expect.objectContaining({ ruleId: 'import-rule', occurences: 1 })
    )
  })
})
