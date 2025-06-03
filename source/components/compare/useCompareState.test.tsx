// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { act } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { useCompareState } from './useCompareState.js'
import type { Config } from '../../lib/types.js'

const mockUseValidatedConfig = vi.fn()

// Mock only external dependencies
vi.mock('../../lib/config/index.js', () => ({
  useValidatedConfig: () => mockUseValidatedConfig(),
}))

const mockCheckoutTo = vi.fn()

vi.mock('../../lib/git/index.js', () => ({
  useGitUtils: () => ({
    isGitReady: true,
    checkoutTo: mockCheckoutTo,
    currentBranch: 'main',
    isHistoryDirty: false,
    walkCommits: vi.fn(),
    revList: null,
    gitErrors: null,
  }),
  getChangedFilesSinceRev: () =>
    Promise.resolve([
      {
        status: 'modified',
        filePath: 'file1.ts',
      },
      {
        status: 'modified',
        filePath: 'file2.tsx',
      },
    ]),
}))

describe('useCompareState', () => {
  const mockConfig: Config = {
    projectName: 'test-project',
    include: ['**/*.ts', '**/*.tsx'],
    exclude: ['**/node_modules/**'],
    fileRules: [],
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseValidatedConfig.mockReturnValue({
      isConfigValid: true,
      sanitizedConfig: mockConfig,
      configErrors: null,
      userConfig: {},
    })
  })

  it('should initialize with default values', () => {
    const { result } = renderHook(() =>
      useCompareState({
        revision: 'test-branch',
      })
    )

    expect(result.current.results).toBeNull()
    expect(result.current.fileList).toBeNull()
    expect(result.current.checkedFileCount).toBe(0)
    expect(result.current.revisionResults).toBeNull()
    expect(result.current.checkedRevisionFileCount).toBe(0)
    expect(result.current.finalResult).toBeNull()
    expect(result.current.isConfigValid).toBe(true)
    expect(result.current.sanitizedConfig).toEqual(mockConfig)
  })

  it('should handle config validation error', () => {
    mockUseValidatedConfig.mockReturnValue({
      isConfigValid: false,
      sanitizedConfig: null,
      configErrors: ['Invalid config'],
      userConfig: null,
    })

    const { result } = renderHook(() =>
      useCompareState({
        revision: 'test-branch',
      })
    )

    expect(result.current.isConfigValid).toBe(false)
    expect(result.current.sanitizedConfig).toBeNull()
  })

  it('should handle missing revision', async () => {
    const { result } = renderHook(() =>
      useCompareState({
        revision: undefined,
      })
    )

    // Wait for effects to run
    await act(async () => {
      await vi.waitFor(() => {
        expect(result.current.finalResult).toBeNull()
      })
    })
  })

  it('should handle commonAncestor option', async () => {
    const { result } = renderHook(() =>
      useCompareState({
        revision: 'test-branch',
        commonAncestor: false,
      })
    )

    // Wait for effects to run
    await act(async () => {
      await vi.waitFor(() => {
        expect(result.current.fileList).toBeNull()
      })
    })
  })

  it('should handle rule and tags filters', async () => {
    const { result } = renderHook(() =>
      useCompareState({
        revision: 'test-branch',
        rule: 'test-rule',
        tags: ['test-tag'],
      })
    )

    // Wait for effects to run
    await act(async () => {
      await vi.waitFor(() => {
        expect(result.current.results).toBeNull()
      })
    })
  })
})
