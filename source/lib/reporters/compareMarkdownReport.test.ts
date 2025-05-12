import { describe, it, expect } from 'vitest'
import compareMarkdownReport from './compareMarkdownReport.js'
import type { CompareResults } from '../types.js'

describe('compareMarkdownReport', () => {
  it('should handle case where all files have zero debt', () => {
    const data: CompareResults = {
      config: { include: [] },
      previousRevResult: {
        hash: 'abc',
        date: '2024-03-18',
        name: 'main',
        totalScore: 0,
        results: [],
      },
      currentRevResult: {
        hash: 'def',
        date: '2024-03-19',
        name: 'feature',
        totalScore: 0,
        results: [],
      },
      noChangesFiles: [],
      lessDeptFiles: [],
      moreDeptFiles: [],
    }

    expect(compareMarkdownReport(data)).toMatchSnapshot()
  })

  it('should handle increased debt score with multiple files', () => {
    const data: CompareResults = {
      config: { include: [] },
      previousRevResult: {
        hash: 'abc',
        date: '2024-03-18',
        name: 'main',
        totalScore: 20,
        results: [],
      },
      currentRevResult: {
        hash: 'def',
        date: '2024-03-19',
        name: 'feature',
        totalScore: 35,
        results: [
          {
            filePath: 'src/components/Button.tsx',
            fileShortPath: 'src/components/Button.tsx',
            totalScore: 10,
            brokenRules: [
              {
                ruleTitle: 'Complex Function',
                ruleId: 'complex-func',
                occurences: 3,
                ruleTotalSore: 15,
                debtScore: 5,
              },
            ],
          },
        ],
      },
      noChangesFiles: [],
      lessDeptFiles: [],
      moreDeptFiles: [
        {
          file: 'src/components/Button.tsx',
          rev: 10,
          current: 15,
          trend: 5,
        },
        {
          file: 'src/utils/helpers.ts',
          rev: 10,
          current: 20,
          trend: 10,
        },
      ],
    }

    expect(compareMarkdownReport(data)).toMatchSnapshot()
  })

  it('should handle decreased debt score with multiple files', () => {
    const data: CompareResults = {
      config: { include: [] },
      previousRevResult: {
        hash: 'abc',
        date: '2024-03-18',
        name: 'main',
        totalScore: 35,
        results: [
          {
            filePath: 'src/components/Button.tsx',
            fileShortPath: 'src/components/Button.tsx',
            totalScore: 10,
            brokenRules: [
              {
                ruleTitle: 'Complex Function',
                ruleId: 'complex-func',
                occurences: 3,
                ruleTotalSore: 15,
                debtScore: 5,
              },
            ],
          },
        ],
      },
      currentRevResult: {
        hash: 'def',
        date: '2024-03-19',
        name: 'feature',
        totalScore: 20,
        results: [],
      },
      noChangesFiles: [],
      lessDeptFiles: [
        {
          file: 'src/components/Button.tsx',
          rev: 15,
          current: 10,
          trend: -5,
        },
        {
          file: 'src/utils/helpers.ts',
          rev: 20,
          current: 10,
          trend: -10,
        },
      ],
      moreDeptFiles: [],
    }

    expect(compareMarkdownReport(data)).toMatchSnapshot()
  })

  it('should handle mixed changes with multiple broken rules', () => {
    const data: CompareResults = {
      config: { include: [] },
      previousRevResult: {
        hash: 'abc',
        date: '2024-03-18',
        name: 'main',
        totalScore: 30,
        results: [
          {
            filePath: 'src/components/Button.tsx',
            fileShortPath: 'src/components/Button.tsx',
            totalScore: 10,
            brokenRules: [
              {
                ruleTitle: 'Complex Function',
                ruleId: 'complex-func',
                occurences: 3,
                ruleTotalSore: 15,
                debtScore: 5,
              },
            ],
          },
        ],
      },
      currentRevResult: {
        hash: 'def',
        date: '2024-03-19',
        name: 'feature',
        totalScore: 35,
        results: [
          {
            filePath: 'src/components/Button.tsx',
            fileShortPath: 'src/components/Button.tsx',
            totalScore: 10,
            brokenRules: [
              {
                ruleTitle: 'Complex Function',
                ruleId: 'complex-func',
                occurences: 3,
                ruleTotalSore: 15,
                debtScore: 5,
              },
            ],
          },
        ],
      },
      noChangesFiles: [
        {
          file: 'src/types/index.ts',
          rev: 5,
          current: 5,
          trend: 0,
        },
      ],
      lessDeptFiles: [
        {
          file: 'src/components/Button.tsx',
          rev: 15,
          current: 10,
          trend: -5,
        },
      ],
      moreDeptFiles: [
        {
          file: 'src/utils/helpers.ts',
          rev: 10,
          current: 20,
          trend: 10,
        },
      ],
    }

    expect(compareMarkdownReport(data)).toMatchSnapshot()
  })

  it('should handle edge cases with empty arrays and zero scores', () => {
    const data: CompareResults = {
      config: { include: [] },
      previousRevResult: {
        hash: 'abc',
        date: '2024-03-18',
        name: 'main',
        totalScore: 0,
        results: [],
      },
      currentRevResult: {
        hash: 'def',
        date: '2024-03-19',
        name: 'feature',
        totalScore: 0,
        results: [],
      },
      noChangesFiles: [
        {
          file: 'src/components/Empty.tsx',
          rev: 0,
          current: 0,
          trend: 0,
        },
      ],
      lessDeptFiles: [],
      moreDeptFiles: [],
    }

    expect(compareMarkdownReport(data)).toMatchSnapshot()
  })

  it('should handle different file types and paths', () => {
    const data: CompareResults = {
      config: { include: [] },
      previousRevResult: {
        hash: 'abc',
        date: '2024-03-18',
        name: 'main',
        totalScore: 25,
        results: [],
      },
      currentRevResult: {
        hash: 'def',
        date: '2024-03-19',
        name: 'feature',
        totalScore: 30,
        results: [
          {
            filePath: 'src/components/Button.tsx',
            fileShortPath: 'src/components/Button.tsx',
            totalScore: 10,
            brokenRules: [
              {
                ruleTitle: 'Style Issues',
                ruleId: 'style-issues',
                occurences: 2,
                ruleTotalSore: 10,
                debtScore: 5,
              },
            ],
          },
        ],
      },
      noChangesFiles: [],
      lessDeptFiles: [
        {
          file: 'src/styles/main.css',
          rev: 10,
          current: 5,
          trend: -5,
        },
      ],
      moreDeptFiles: [
        {
          file: 'src/components/Header/Header.tsx',
          rev: 10,
          current: 15,
          trend: 5,
        },
        {
          file: 'src/pages/Home/index.tsx',
          rev: 5,
          current: 10,
          trend: 5,
        },
      ],
    }

    expect(compareMarkdownReport(data)).toMatchSnapshot()
  })
})
