import { describe, it, expect } from 'vitest'
import { filterIgnoredFiles } from './filterIgnoredFiles.js'
import type { Config } from '../types.js'

describe('filterIgnoredFiles', () => {
  const mockConfig: Config = {
    include: ['**/*.ts'],
    exclude: ['**/*.test.ts', '**/node_modules/**'],
    fileRules: [],
  }

  it('should filter out excluded files', () => {
    const files = [
      'src/file.ts',
      'src/file.test.ts',
      'node_modules/package/index.ts',
      'src/another.ts',
    ]

    const result = filterIgnoredFiles(
      files,
      mockConfig.exclude,
      mockConfig.include
    )
    expect(result).toEqual(['src/file.ts', 'src/another.ts'])
  })

  it('should handle empty exclude patterns', () => {
    const configWithoutExclude = { ...mockConfig, exclude: [] }
    const files = ['src/file.ts', 'src/file.test.ts']

    const result = filterIgnoredFiles(
      files,
      configWithoutExclude.exclude,
      configWithoutExclude.include
    )
    expect(result).toEqual(files)
  })

  it('should handle empty file list', () => {
    const result = filterIgnoredFiles(
      [],
      mockConfig.exclude,
      mockConfig.include
    )
    expect(result).toEqual([])
  })

  it('should handle undefined exclude patterns', () => {
    const configWithoutExclude = { ...mockConfig, exclude: undefined }
    const files = ['src/file.ts', 'src/file.test.ts']

    const result = filterIgnoredFiles(
      files,
      configWithoutExclude.exclude,
      configWithoutExclude.include
    )
    expect(result).toEqual(files)
  })
})
