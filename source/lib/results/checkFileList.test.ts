import { describe, it, expect, vi, beforeEach } from 'vitest'
import { checkFileList } from './checkFileList.js'
import fs from 'fs'

// Mock fs module correctly
vi.mock('fs', () => {
  return {
    default: {
      readFileSync: vi.fn(),
    },
    readFileSync: vi.fn(),
  }
})

describe('checkFileList', () => {
  const baseConfig = {
    include: ['**/*.ts'],
    exclude: [],
    fileRules: [
      {
        id: 'rule1',
        title: 'Test Rule',
        debtScore: 1,
        include: ['**/*.ts'],
        matchRule: () => 1,
      },
    ],
  }

  const baseFileList = ['file1.ts', 'file2.ts']
  const baseIncrement = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    // Mock fs.readFileSync to return a test content
    vi.mocked(fs.readFileSync).mockReturnValue('test content')
  })

  it('should return empty array when fileList is empty', async () => {
    const result = await checkFileList({
      fileList: [],
      config: baseConfig,
      rule: undefined,
      tags: undefined,
      increment: baseIncrement,
    })
    expect(result).toEqual([])
  })

  it('should process files with default concurrency settings', async () => {
    const result = await checkFileList({
      fileList: baseFileList,
      config: baseConfig,
      rule: undefined,
      tags: undefined,
      increment: baseIncrement,
    })

    expect(result).toHaveLength(2)
    expect(result[0]).toEqual({
      filePath: 'file1.ts',
      fileShortPath: 'file1.ts',
      brokenRules: [
        {
          ruleTitle: 'Test Rule',
          ruleId: 'rule1',
          occurences: 1,
          ruleTotalSore: 1,
        },
      ],
      totalScore: 1,
    })
    expect(result[1]).toEqual({
      filePath: 'file2.ts',
      fileShortPath: 'file2.ts',
      brokenRules: [
        {
          ruleTitle: 'Test Rule',
          ruleId: 'rule1',
          occurences: 1,
          ruleTotalSore: 1,
        },
      ],
      totalScore: 1,
    })
    expect(baseIncrement).toHaveBeenCalledTimes(2)
  })

  it('should filter results by rule ID', async () => {
    const result = await checkFileList({
      fileList: baseFileList,
      config: baseConfig,
      rule: 'rule1',
      tags: undefined,
      increment: baseIncrement,
    })

    expect(result).toHaveLength(2)
    expect(result[0].brokenRules[0].ruleId).toBe('rule1')
  })

  it('should filter results by tags', async () => {
    const configWithTags = {
      ...baseConfig,
      fileRules: [
        {
          ...baseConfig.fileRules[0],
          tags: ['test'],
        },
      ],
    }

    const result = await checkFileList({
      fileList: baseFileList,
      config: configWithTags,
      rule: undefined,
      tags: ['test'],
      increment: baseIncrement,
    })

    expect(result).toHaveLength(2)
    expect(result[0].brokenRules[0].ruleId).toBe('rule1')
  })

  it('should handle file read errors gracefully', async () => {
    vi.mocked(fs.readFileSync).mockImplementation(() => {
      throw new Error('File not found')
    })

    const result = await checkFileList({
      fileList: baseFileList,
      config: baseConfig,
      rule: undefined,
      tags: undefined,
      increment: baseIncrement,
    })

    expect(result).toHaveLength(2)
    expect(result[0]).toEqual({
      filePath: 'file1.ts',
      fileShortPath: 'file1.ts',
      brokenRules: [],
      totalScore: 0,
    })
    expect(result[1]).toEqual({
      filePath: 'file2.ts',
      fileShortPath: 'file2.ts',
      brokenRules: [],
      totalScore: 0,
    })
    expect(baseIncrement).toHaveBeenCalledTimes(2)
  })
})
