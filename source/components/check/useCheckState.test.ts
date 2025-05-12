// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { act } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { useCheckState } from './useCheckState'
import { getFileList } from '../../lib/filters/getFileList.js'
import { checkFileList } from '../../lib/results/checkFileList.js'
import { useValidatedConfig } from '../../lib/config/index.js'

// Mock the dependencies
vi.mock('../../lib/filters/getFileList.js')
vi.mock('../../lib/results/checkFileList.js')
vi.mock('../../lib/config/index.js')

describe('useCheckState', () => {
  const mockConfig = {
    include: ['**/*.ts'],
    rules: [
      {
        id: 'test-rule',
        pattern: 'console.log',
        message: 'Console log found',
      },
    ],
  }

  const mockFileList = ['file1.ts', 'file2.ts']
  const mockFileResults = [
    {
      file: 'file1.ts',
      matches: [
        {
          line: 1,
          column: 1,
          message: 'Console log found',
        },
      ],
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useValidatedConfig as any).mockReturnValue({
      isConfigValid: true,
      sanitizedConfig: mockConfig,
      configErrors: null,
    })
    ;(getFileList as any).mockResolvedValue(mockFileList)
    ;(checkFileList as any).mockResolvedValue(mockFileResults)
  })

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCheckState({}))

    expect(result.current.results).toBeNull()
    expect(result.current.fileList).toBeNull()
    expect(result.current.checkedFileCount).toBe(0)
    expect(result.current.isConfigValid).toBe(true)
    expect(result.current.configErrors).toBeNull()
  })

  it('should fetch file list when config is valid', async () => {
    const { result } = renderHook(() => useCheckState({}))

    // Wait for the async operations to complete
    await act(async () => {
      await vi.waitFor(() => {
        expect(result.current.fileList).toEqual(mockFileList)
      })
    })
  })

  it('should check files when file list is available', async () => {
    const { result } = renderHook(() => useCheckState({}))

    // Wait for the async operations to complete
    await act(async () => {
      await vi.waitFor(() => {
        expect(result.current.results).toEqual({
          results: mockFileResults,
          config: mockConfig,
        })
      })
    })
  })

  it('should increment checked file count', async () => {
    ;(checkFileList as any).mockImplementation(
      ({ files, config, rule, tags, increment }) => {
        increment()
        return mockFileResults
      }
    )

    const { result } = renderHook(() => useCheckState({}))

    // Wait for the async operations to complete
    await act(async () => {
      await vi.waitFor(() => {
        expect(result.current.checkedFileCount).toBe(1)
      })
    })
  })

  it('should handle config validation errors', () => {
    const configErrors = ['Invalid config']
    ;(useValidatedConfig as any).mockReturnValue({
      isConfigValid: false,
      sanitizedConfig: null,
      configErrors,
    })

    const { result } = renderHook(() => useCheckState({}))

    expect(result.current.isConfigValid).toBe(false)
    expect(result.current.configErrors).toEqual(configErrors)
  })

  it('should handle file list fetch errors', async () => {
    const error = new Error('Failed to fetch files')
    ;(getFileList as any).mockRejectedValue(error)

    const { result } = renderHook(() => useCheckState({}))

    // Wait for the async operations to complete
    await act(async () => {
      await vi.waitFor(() => {
        expect(result.current.fileList).toBeNull()
        expect(result.current.isConfigValid).toBe(false)
        expect(result.current.configErrors).toEqual([error.message])
      })
    })
  })

  it('should generate correct filter messages', () => {
    const { result } = renderHook(() =>
      useCheckState({
        rule: 'test-rule',
        tags: ['test-tag'],
        changedSince: '2024-01-01',
      })
    )

    expect(result.current.collectingFrom).toBe(
      'Collecting debt from files changed since 2024-01-01'
    )
    expect(result.current.hasFilters).toBe(true)
    expect(result.current.withFilters).toBe(
      'With rules filters on [tags : test-tag] & [rule id : test-rule]'
    )
  })
})
