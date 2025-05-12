import { describe, it, expect } from 'vitest'
import getFileRulesErrors from './getFileRulesErrors.js'
import type { Config, SanitizedFileRule } from '../types.js'

describe('getFileRulesErrors', () => {
  const mockConfig: Config = {
    include: ['**/*.ts'],
    exclude: [],
    fileRules: [
      {
        id: 'test-rule-1',
        title: 'Test Rule 1',
        debtScore: 1,
        include: ['**/*.ts'],
        matchRule: ({ findOne }) => findOne('test'),
      } as SanitizedFileRule,
      {
        id: 'test-rule-2',
        title: 'Test Rule 2',
        debtScore: 1,
        include: ['**/*.ts'],
        matchRule: ({ countAll }) => countAll('import'),
      } as SanitizedFileRule,
    ],
  }

  it('should return empty array when no rules are broken', () => {
    const fileContent = 'This is a sample file without any matches'
    const result = getFileRulesErrors(mockConfig, 'test.ts', fileContent)
    expect(result).toEqual([])
  })

  it('should detect broken rules and return them with occurrences', () => {
    const fileContent = 'This is a test file with test and import'
    const result = getFileRulesErrors(mockConfig, 'test.ts', fileContent)
    
    expect(result).toHaveLength(2)
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'test-rule-1',
          ruleTitle: 'Test Rule 1',
          occurences: 1,
        }),
        expect.objectContaining({
          ruleId: 'test-rule-2',
          ruleTitle: 'Test Rule 2',
          occurences: 1,
        }),
      ])
    )
  })

  it('should handle empty config', () => {
    const emptyConfig: Config = {
      include: ['**/*.ts'],
      exclude: [],
    }
    const result = getFileRulesErrors(emptyConfig, 'test.ts', 'content')
    expect(result).toEqual([])
  })

  it('should handle config with no fileRules', () => {
    const configWithoutRules: Config = {
      include: ['**/*.ts'],
      exclude: [],
      fileRules: undefined,
    }
    const result = getFileRulesErrors(configWithoutRules, 'test.ts', 'content')
    expect(result).toEqual([])
  })

  it('should count multiple occurrences correctly', () => {
    const fileContent = 'test test test import import'
    const result = getFileRulesErrors(mockConfig, 'test.ts', fileContent)
    
    expect(result).toHaveLength(2)
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'test-rule-1',
          occurences: 1,
        }),
        expect.objectContaining({
          ruleId: 'test-rule-2',
          occurences: 2,
        }),
      ])
    )
  })

  it('should handle findJsImportFrom utility', () => {
    const configWithImport: Config = {
      include: ['**/*.ts'],
      exclude: [],
      fileRules: [
        {
          id: 'import-rule',
          title: 'Import Rule',
          debtScore: 1,
          include: ['**/*.ts'],
          matchRule: ({ findJsImportFrom }) => findJsImportFrom('React', 'react'),
        } as SanitizedFileRule,
      ],
    }

    const fileContent = "import React from 'react'"
    const result = getFileRulesErrors(configWithImport, 'test.ts', fileContent)
    
    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(
      expect.objectContaining({
        ruleId: 'import-rule',
        occurences: 1,
      })
    )
  })
})

