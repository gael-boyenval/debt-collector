import { describe, it, expect } from 'vitest'
import { formatResults } from './formatResults.js'
import type { FileResults } from '../types.js'

describe('formatResults', () => {
  const mockFileResults: FileResults[] = [
    {
      filePath: 'src/file1.ts',
      fileShortPath: 'file1.ts',
      totalScore: 5,
      brokenRules: [
        {
          ruleId: 'rule1',
          ruleTitle: 'Rule 1',
          occurences: 2,
          ruleTotalSore: 5,
        },
      ],
    },
    {
      filePath: 'src/file2.tsx',
      fileShortPath: 'file2.tsx',
      totalScore: 3,
      brokenRules: [
        {
          ruleId: 'rule2',
          ruleTitle: 'Rule 2',
          occurences: 1,
          ruleTotalSore: 3,
        },
      ],
    },
    {
      filePath: 'src/file3.ts',
      fileShortPath: 'file3.ts',
      totalScore: 0,
      brokenRules: [],
    },
  ]

  it('should filter out files with zero score and calculate totals', () => {
    const result = formatResults(mockFileResults)
    expect(result.formatedResult).toEqual([
      mockFileResults[0],
      mockFileResults[1],
    ])
    expect(result.totalDeptScore).toBe(8)
    expect(result.impactedFilesNumber).toBe(2)
  })

  it('should handle empty results array', () => {
    const result = formatResults([])
    expect(result.formatedResult).toEqual([])
    expect(result.totalDeptScore).toBe(0)
    expect(result.impactedFilesNumber).toBe(0)
  })

  it('should handle results with all zero scores', () => {
    const zeroScoreResults: FileResults[] = [
      {
        filePath: 'src/file1.ts',
        fileShortPath: 'file1.ts',
        totalScore: 0,
        brokenRules: [],
      },
      {
        filePath: 'src/file2.tsx',
        fileShortPath: 'file2.tsx',
        totalScore: 0,
        brokenRules: [],
      },
    ]
    const result = formatResults(zeroScoreResults)
    expect(result.formatedResult).toEqual([])
    expect(result.totalDeptScore).toBe(0)
    expect(result.impactedFilesNumber).toBe(0)
  })

  it('should limit results to top N files when limitTop is provided', () => {
    const result = formatResults(mockFileResults, 1)
    expect(result.formatedResult).toEqual([mockFileResults[0]])
    expect(result.totalDeptScore).toBe(5)
    expect(result.impactedFilesNumber).toBe(1)
  })

  it('should sort results by totalScore in descending order', () => {
    const unsortedResults: FileResults[] = [
      {
        filePath: 'src/file1.ts',
        fileShortPath: 'file1.ts',
        totalScore: 2,
        brokenRules: [
          {
            ruleId: 'rule1',
            ruleTitle: 'Rule 1',
            occurences: 1,
            ruleTotalSore: 2,
          },
        ],
      },
      {
        filePath: 'src/file2.tsx',
        fileShortPath: 'file2.tsx',
        totalScore: 5,
        brokenRules: [
          {
            ruleId: 'rule2',
            ruleTitle: 'Rule 2',
            occurences: 2,
            ruleTotalSore: 5,
          },
        ],
      },
    ]
    const result = formatResults(unsortedResults)
    expect(result.formatedResult[0].totalScore).toBe(5)
    expect(result.formatedResult[1].totalScore).toBe(2)
  })

  it('should handle limitTop greater than available results', () => {
    const result = formatResults(mockFileResults, 10)
    expect(result.formatedResult).toEqual([
      mockFileResults[0],
      mockFileResults[1],
    ])
    expect(result.totalDeptScore).toBe(8)
    expect(result.impactedFilesNumber).toBe(2)
  })
})
