import { describe, it, expect, vi, beforeEach } from 'vitest'
import getFileResult from './getFileResult.js'
import type { Config, SanitizedFileRule } from '../types.js'
import fs from 'fs'

// We only need to mock fs.readFileSync since it's the only external dependency
vi.mock('fs', () => ({
  default: {
    readFileSync: vi.fn(),
  },
  readFileSync: vi.fn(),
}))

const mockFileContent = (content: string | Error) => {
  return (
    fs.readFileSync as unknown as ReturnType<typeof vi.fn>
  ).mockReturnValue(content)
}

describe('getFileResult', () => {
  // Basic config that will be overridden in each test
  const baseFileRule: SanitizedFileRule = {
    id: 'no-console',
    title: 'No console.log',
    debtScore: 1,
    include: ['**/*'],
    matchRule: (utils) => utils.countAll(/console\.log/g),
  }

  const baseConfig: Config = {
    include: ['src/**/*'],
    fileRules: [baseFileRule],
  }

  const mockIncrementCounter = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('include/exclude patterns', () => {
    it('should call the incrementCounter function', async () => {
      await getFileResult(
        baseConfig,
        'src/components/Button.ts',
        mockIncrementCounter
      )
      expect(mockIncrementCounter).toHaveBeenCalledTimes(1)
    })

    it('should process TypeScript files in src directory', async () => {
      const config: Config = {
        ...baseConfig,
        fileRules: [
          {
            ...baseFileRule,
            id: 'no-console-in-components',
            include: ['src/components/**/*.ts'],
          },
          {
            ...baseFileRule,
            id: 'no-console-in-utils',
            include: ['src/utils/**/*.ts'],
          },
        ],
      }

      mockFileContent('console.log("test");')

      const result = await getFileResult(
        config,
        'src/components/Button.ts',
        mockIncrementCounter
      )

      expect(result.brokenRules).toContainEqual(
        expect.objectContaining({
          ruleId: 'no-console-in-components',
        })
      )
      expect(result.brokenRules).not.toContainEqual(
        expect.objectContaining({
          ruleId: 'no-console-in-utils',
        })
      )
    })

    it('should ignore files in based on the exclude rule key', async () => {
      const config: Config = {
        ...baseConfig,
        fileRules: [
          {
            ...baseFileRule,
            exclude: ['**/node_modules/**'],
          },
        ],
      }

      mockFileContent('console.log("test");')
      const result = await getFileResult(
        config,
        'node_modules/lodash/index.ts',
        mockIncrementCounter
      )
      expect(result.brokenRules).toEqual([])
    })

    it('should ignore files if not match the include rule key', async () => {
      const config: Config = {
        ...baseConfig,
        fileRules: [
          {
            ...baseFileRule,
            include: ['*.css'],
          },
        ],
      }

      mockFileContent('console.log("test");')
      const result = await getFileResult(
        config,
        'some-file.ts',
        mockIncrementCounter
      )
      expect(result.brokenRules).toEqual([])
    })
  })

  describe('rule violations', () => {
    it('should detect and report console.log usage', async () => {
      const config: Config = {
        ...baseConfig,
        fileRules: [
          {
            ...baseFileRule,
            matchRule: (utils) => utils.countAll(/console\.log/g),
          },
        ],
      }
      const fileContent = `
        console.log('test1');
        function test() {
          console.log('test2');
        }
      `
      mockFileContent(fileContent)

      const result = await getFileResult(
        config,
        'src/utils/logger.ts',
        mockIncrementCounter
      )

      expect(result.brokenRules).toEqual([
        {
          ruleTitle: 'No console.log',
          ruleId: 'no-console',
          occurences: 2,
          ruleTotalSore: 2,
        },
      ])
      expect(mockIncrementCounter).toHaveBeenCalledTimes(1)
    })

    it('should handle multiple rule violations in the same file', async () => {
      const config: Config = {
        ...baseConfig,
        fileRules: [
          {
            ...baseFileRule,
            matchRule: (utils) => utils.countAll(/console\.log/g),
          },
          {
            id: 'no-todo',
            title: 'No TODO comments',
            debtScore: 2,
            include: ['**/*.ts'],
            matchRule: (utils) => utils.countAll(/TODO/g),
          },
        ],
      }
      const fileContent = `
        // TODO: Refactor this
        console.log('test');
        function test() {
          // TODO: Add tests
          console.log('debug');
        }
      `
      mockFileContent(fileContent)

      const result = await getFileResult(
        config,
        'src/services/api.ts',
        mockIncrementCounter
      )

      expect(result.brokenRules).toEqual([
        {
          ruleTitle: 'No console.log',
          ruleId: 'no-console',
          occurences: 2,
          ruleTotalSore: 2,
        },
        {
          ruleTitle: 'No TODO comments',
          ruleId: 'no-todo',
          occurences: 2,
          ruleTotalSore: 4,
        },
      ])
      expect(mockIncrementCounter).toHaveBeenCalledTimes(1)
    })

    it('should count occurences and total score for each rule, and provide the correct total score', async () => {
      const config: Config = {
        ...baseConfig,
        fileRules: [
          {
            ...baseFileRule,
            debtScore: 3,
            matchRule: (utils) => utils.countAll(/console\.log/g),
          },
          {
            id: 'no-todo',
            title: 'No TODO comments',
            debtScore: 2,
            include: ['**/*.ts'],
            matchRule: (utils) => utils.countAll(/TODO/g),
          },
        ],
      }
      const fileContent = `
        // TODO: Fix this
        console.log('test');
        function test() {
          console.log('debug');
          // TODO: Add tests
          console.log('another');
        }
      `
      mockFileContent(fileContent)

      const result = await getFileResult(
        config,
        'src/services/api.ts',
        mockIncrementCounter
      )

      expect(result.brokenRules).toEqual([
        {
          ruleTitle: 'No console.log',
          ruleId: 'no-console',
          occurences: 3,
          ruleTotalSore: 9,
        },
        {
          ruleTitle: 'No TODO comments',
          ruleId: 'no-todo',
          occurences: 2,
          ruleTotalSore: 4,
        },
      ])
      expect(result.totalScore).toBe(13)
      expect(mockIncrementCounter).toHaveBeenCalledTimes(1)
    })
  })

  describe('error handling', () => {
    it('should handle file read errors gracefully', async () => {
      const config: Config = {
        ...baseConfig,
      }
      mockFileContent(new Error('File not found'))

      const result = await getFileResult(
        config,
        'src/nonexistent.ts',
        mockIncrementCounter
      )

      expect(result).toEqual({
        filePath: 'src/nonexistent.ts',
        fileShortPath: 'src/nonexistent.ts',
        brokenRules: [],
        adoptionRules: [],
        totalScore: 0,
      })
      expect(mockIncrementCounter).toHaveBeenCalledTimes(1)
    })

    it('should handle empty files', async () => {
      const config: Config = {
        ...baseConfig,
      }
      mockFileContent('')

      const result = await getFileResult(
        config,
        'src/empty.ts',
        mockIncrementCounter
      )

      expect(result).toEqual({
        filePath: 'src/empty.ts',
        fileShortPath: 'src/empty.ts',
        brokenRules: [],
        adoptionRules: [],
        totalScore: 0,
      })
      expect(mockIncrementCounter).toHaveBeenCalledTimes(1)
    })
  })

  describe('adoptionRules', () => {
    const baseAdoptionRule: SanitizedFileRule = {
      id: 'prefer-const',
      title: 'Prefer const',
      debtScore: 1,
      include: ['**/*'],
      matchRule: (utils) => utils.countAll(/const /g),
    }

    const baseConfig: Config = {
      include: ['src/**/*'],
      adoptionRules: [baseAdoptionRule],
    }

    it('should return empty adoptionRules if no matches', async () => {
      mockFileContent('let a = 1;')
      const result = await getFileResult(
        baseConfig,
        'src/utils/const.ts',
        mockIncrementCounter
      )
      expect(result.adoptionRules).toEqual([])
    })

    it('should detect and report adoption rule matches', async () => {
      mockFileContent('const a = 1; const b = 2;')
      const result = await getFileResult(
        baseConfig,
        'src/utils/const.ts',
        mockIncrementCounter
      )
      expect(result.adoptionRules).toEqual([
        {
          ruleTitle: 'Prefer const',
          ruleId: 'prefer-const',
          occurences: 2,
          ruleTotalSore: 2,
        },
      ])
    })

    it('should handle multiple adoption rules', async () => {
      const config: Config = {
        ...baseConfig,
        adoptionRules: [
          baseAdoptionRule,
          {
            id: 'prefer-let',
            title: 'Prefer let',
            debtScore: 2,
            include: ['**/*'],
            matchRule: (utils) => utils.countAll(/let /g),
          },
        ],
      }
      mockFileContent('const a = 1; let b = 2; let c = 3;')
      const result = await getFileResult(
        config,
        'src/utils/constlet.ts',
        mockIncrementCounter
      )
      expect(result.adoptionRules).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ruleId: 'prefer-const',
            occurences: 1,
          }),
          expect.objectContaining({
            ruleId: 'prefer-let',
            occurences: 2,
          }),
        ])
      )
    })

    it('should handle config with no adoptionRules', async () => {
      const config: Config = {
        include: ['src/**/*'],
        adoptionRules: undefined,
      }
      mockFileContent('const a = 1;')
      const result = await getFileResult(
        config,
        'src/utils/const.ts',
        mockIncrementCounter
      )
      expect(result.adoptionRules).toEqual([])
    })
  })
})
