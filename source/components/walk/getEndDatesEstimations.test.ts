// @vitest-environment node
import { describe, it, expect } from 'vitest'
import { getEndDatesEstimations } from './getEndDatesEstimations'
import type { Config, RevisionResults, BrokenRule } from '../../lib/types.js'

/**
 * Base mock for Config and RevisionResults for Debt Collector tests.
 * Extend these in each test for specific scenarios.
 */
const baseConfig: Config = {
  include: ['src/**/*.ts'],
  fileRules: [
    {
      id: 'rule-1',
      title: 'No console.log',
      debtScore: 5,
      matchRule: () => 0,
    },
    {
      id: 'rule-2',
      title: 'No TODOs',
      debtScore: 3,
      matchRule: () => 0,
    },
  ],
}

const baseBrokenRule: BrokenRule = {
  ruleId: 'rule-1',
  ruleTitle: 'No console.log',
  occurences: 2,
  ruleTotalSore: 10,
  debtScore: 5,
}

const baseRevision: RevisionResults = {
  hash: 'abc123',
  date: '2024-01-01',
  name: 'commit1',
  totalScore: 10,
  results: [
    {
      filePath: 'src/file1.ts',
      fileShortPath: 'file1.ts',
      totalScore: 10,
      brokenRules: [baseBrokenRule],
    },
  ],
}

const makeRevision = (
  opts: Partial<RevisionResults> & { brokenRules?: BrokenRule[] }
) => {
  const { brokenRules, ...rest } = opts
  return {
    ...baseRevision,
    ...rest,
    // Always attach brokenRules for test logic
    brokenRules: brokenRules ?? [],
  } as RevisionResults & { brokenRules: BrokenRule[] }
}

describe('getEndDatesEstimations', () => {
  it('should return correct estimations for a simple decreasing trend', () => {
    const brokenRulesArr = [
      [
        { ...baseBrokenRule, ruleTotalSore: 10, occurences: 2 },
        {
          ruleId: 'rule-2',
          ruleTitle: 'No TODOs',
          occurences: 1,
          ruleTotalSore: 3,
          debtScore: 3,
        },
      ],
      [
        { ...baseBrokenRule, ruleTotalSore: 5, occurences: 1 },
        {
          ruleId: 'rule-2',
          ruleTitle: 'No TODOs',
          occurences: 0,
          ruleTotalSore: 0,
          debtScore: 3,
        },
      ],
      [
        { ...baseBrokenRule, ruleTotalSore: 0, occurences: 0 },
        {
          ruleId: 'rule-2',
          ruleTitle: 'No TODOs',
          occurences: 0,
          ruleTotalSore: 0,
          debtScore: 3,
        },
      ],
    ]
    const results: RevisionResults[] = [
      makeRevision({
        date: '2024-01-01',
        totalScore: 10,
        brokenRules: brokenRulesArr[0],
      }),
      makeRevision({
        date: '2024-01-02',
        totalScore: 5,
        brokenRules: brokenRulesArr[1],
      }),
      makeRevision({
        date: '2024-01-03',
        totalScore: 0,
        brokenRules: brokenRulesArr[2],
      }),
    ]
    const estimation = getEndDatesEstimations({
      config: baseConfig,
      results,
    })
    expect(estimation.global.currentScore).toBe(0)
    expect(estimation.rules['rule-1'].currentScore).toBe(0)
    expect(estimation.rules['rule-2'].currentScore).toBe(0)
    expect(estimation.global.avairage.tendencyDay).toBeLessThan(0)
    expect(estimation.global.avairage.estimatedendDate).not.toBe('never')
  })

  it('should handle no change in score (flat trend)', () => {
    const results: RevisionResults[] = [
      makeRevision({ date: '2024-01-01', totalScore: 5, brokenRules: [] }),
      makeRevision({ date: '2024-01-02', totalScore: 5, brokenRules: [] }),
    ]
    const estimation = getEndDatesEstimations({
      config: baseConfig,
      results,
    })
    expect(estimation.global.avairage.tendencyDay).toBe(0)
    expect(estimation.global.avairage.estimatedendDate).toBe('never')
  })

  it('should handle increasing score (worsening debt)', () => {
    const results: RevisionResults[] = [
      makeRevision({ date: '2024-01-01', totalScore: 2, brokenRules: [] }),
      makeRevision({ date: '2024-01-02', totalScore: 5, brokenRules: [] }),
    ]
    const estimation = getEndDatesEstimations({
      config: baseConfig,
      results,
    })
    expect(estimation.global.avairage.tendencyDay).toBeGreaterThan(0)
    expect(estimation.global.avairage.estimatedendDate).toBe('never')
  })

  it('should handle empty results array', () => {
    const estimation = getEndDatesEstimations({
      config: baseConfig,
      results: [],
    })
    expect(estimation.global).toMatchInlineSnapshot(`
      {
        "avairage": {
          "daysToReachZero": 0,
          "estimatedendDate": "never",
          "tendencyDay": 0,
          "tendencyMonth": 0,
        },
        "currentScore": 0,
        "lastPeriod": {
          "daysToReachZero": 0,
          "estimatedendDate": "never",
          "tendencyDay": 0,
          "tendencyMonth": 0,
        },
      }
    `)
    expect(estimation.global.currentScore).toBe(0)
    expect(estimation.rules['rule-1'].currentScore).toBe(0)
    expect(estimation.rules['rule-2'].currentScore).toBe(0)
  })

  it('should handle missing rules in config gracefully', () => {
    const config: Config = { include: ['src/**/*.ts'], fileRules: [] }
    const results: RevisionResults[] = [
      makeRevision({ date: '2024-01-01', totalScore: 5, brokenRules: [] }),
    ]
    const estimation = getEndDatesEstimations({
      config: config,
      results,
    })
    expect(estimation.rules).toEqual({})
    expect(estimation.global.currentScore).toBe(5)
  })

  it('should handle missing brokenRules in RevisionResults', () => {
    const results: RevisionResults[] = [
      makeRevision({ date: '2024-01-01', totalScore: 5, brokenRules: [] }),
    ]
    const estimation = getEndDatesEstimations({
      config: baseConfig,
      results,
    })
    expect(estimation.global.currentScore).toBe(5)
  })
})
