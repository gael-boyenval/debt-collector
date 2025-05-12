import { describe, it, expect } from 'vitest'
import { getRulesForFile, filtersRulesFromOptions } from './filterRules.js'
import type { Config, SanitizedFileRule } from '../types.js'

describe('filterRules', () => {
  const mockConfig: Config = {
    include: ['**/*.ts', '**/*.tsx'],
    exclude: ['**/node_modules/**'],
    fileRules: [
      {
        id: 'rule1',
        title: 'Rule 1',
        description: 'Test rule 1',
        debtScore: 1,
        include: ['**/*.ts'],
        tags: ['typescript', 'test'],
        matchRule: () => 1,
      },
      {
        id: 'rule2',
        title: 'Rule 2',
        description: 'Test rule 2',
        debtScore: 1,
        include: ['**/*.tsx'],
        tags: ['react', 'test'],
        matchRule: () => 1,
      },
    ],
  }

  describe('getRulesForFile', () => {
    it('should return empty rules when no file rules are configured', () => {
      const configWithoutRules = { ...mockConfig, fileRules: undefined }
      const result = getRulesForFile(configWithoutRules, 'src/file.ts')
      expect(result).toEqual({})
    })

    it('should return matching rules for a TypeScript file', () => {
      const result = getRulesForFile(mockConfig, 'src/file.ts')
      expect(result.fileRules).toHaveLength(1)
      expect(result.fileRules?.[0].id).toBe('rule1')
    })

    it('should return matching rules for a TSX file', () => {
      const result = getRulesForFile(mockConfig, 'src/file.tsx')
      expect(result.fileRules).toHaveLength(1)
      expect(result.fileRules?.[0].id).toBe('rule2')
    })

    it('should return empty rules for non-matching file', () => {
      const result = getRulesForFile(mockConfig, 'src/file.js')
      expect(result.fileRules).toHaveLength(0)
    })
  })

  describe('filtersRulesFromOptions', () => {
    it('should return all rules when no filters are applied', () => {
      const result = filtersRulesFromOptions(mockConfig)
      expect(result.fileRules).toHaveLength(2)
      expect(result.fileRules).toEqual(mockConfig.fileRules)
    })

    it('should filter rules by rule ID', () => {
      const result = filtersRulesFromOptions(mockConfig, 'rule1')
      expect(result.fileRules).toHaveLength(1)
      expect(result.fileRules?.[0].id).toBe('rule1')
    })

    it('should filter rules by tags', () => {
      const result = filtersRulesFromOptions(mockConfig, null, ['react'])
      expect(result.fileRules).toHaveLength(1)
      expect(result.fileRules?.[0].id).toBe('rule2')
    })

    it('should filter rules by both ID and tags', () => {
      const result = filtersRulesFromOptions(mockConfig, 'rule1', [
        'typescript',
      ])
      expect(result.fileRules).toHaveLength(1)
      expect(result.fileRules?.[0].id).toBe('rule1')
    })

    it('should return empty rules when no matches found', () => {
      const result = filtersRulesFromOptions(mockConfig, 'rule1', ['react'])
      expect(result.fileRules).toHaveLength(0)
    })

    it('should handle empty tags array', () => {
      const result = filtersRulesFromOptions(mockConfig, null, [])
      expect(result.fileRules).toHaveLength(2)
      expect(result.fileRules).toEqual(mockConfig.fileRules)
    })

    it('should handle null tags', () => {
      const result = filtersRulesFromOptions(mockConfig, null, null)
      expect(result.fileRules).toHaveLength(2)
      expect(result.fileRules).toEqual(mockConfig.fileRules)
    })

    it('should handle undefined fileRules', () => {
      const configWithoutRules = { ...mockConfig, fileRules: undefined }
      const result = filtersRulesFromOptions(configWithoutRules)
      expect(result.fileRules).toBeUndefined()
    })
  })
})
