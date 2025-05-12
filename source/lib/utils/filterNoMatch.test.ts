import { describe, it, expect } from 'vitest'
import { filterNoMatch } from './filterNoMatch.js'
import type { Config, FileResults } from '../types.js'

describe('filterNoMatch', () => {
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
      {
        id: 'rule3',
        title: 'Rule 3',
        debtScore: 3,
        include: ['**/*.js'],
        matchRule: () => 1,
      },
    ],
  }

  const mockFileResults: FileResults[] = [
    {
      filePath: 'src/file1.ts',
      fileShortPath: 'file1.ts',
      totalScore: 1,
      brokenRules: [
        {
          ruleId: 'rule1',
          ruleTitle: 'Rule 1',
          occurences: 1,
          ruleTotalSore: 1,
        },
      ],
    },
    {
      filePath: 'src/file2.tsx',
      fileShortPath: 'file2.tsx',
      totalScore: 2,
      brokenRules: [
        {
          ruleId: 'rule2',
          ruleTitle: 'Rule 2',
          occurences: 1,
          ruleTotalSore: 2,
        },
      ],
    },
  ]

  it('should identify rules that did not match any files', () => {
    const result = filterNoMatch(mockFileResults, mockConfig)
    expect(result.notMatchRules).toEqual([
      {
        id: 'rule3',
        title: 'Rule 3',
      },
    ])
    expect(result.rulesCount).toBe(3)
    expect(result.existingRulesCount).toBe(2)
  })

  it('should handle empty file results', () => {
    const result = filterNoMatch([], mockConfig)
    expect(result.notMatchRules).toEqual(
      mockConfig.fileRules!.map(({ id, title }) => ({ id, title }))
    )
    expect(result.rulesCount).toBe(3)
    expect(result.existingRulesCount).toBe(0)
  })

  it('should handle null config', () => {
    const result = filterNoMatch(mockFileResults, null)
    expect(result.notMatchRules).toEqual([])
    expect(result.rulesCount).toBe(0)
    expect(result.existingRulesCount).toBe(2)
  })

  it('should handle config with no file rules', () => {
    const configWithoutRules = { ...mockConfig, fileRules: [] }
    const result = filterNoMatch(mockFileResults, configWithoutRules)
    expect(result.notMatchRules).toEqual([])
    expect(result.rulesCount).toBe(0)
    expect(result.existingRulesCount).toBe(2)
  })

  it('should handle files with no broken rules', () => {
    const filesWithoutBrokenRules: FileResults[] = [
      {
        filePath: 'src/file1.ts',
        fileShortPath: 'file1.ts',
        totalScore: 0,
        brokenRules: [],
      },
    ]
    const result = filterNoMatch(filesWithoutBrokenRules, mockConfig)
    expect(result.notMatchRules).toEqual(
      mockConfig.fileRules!.map(({ id, title }) => ({ id, title }))
    )
    expect(result.rulesCount).toBe(3)
    expect(result.existingRulesCount).toBe(0)
  })
})
