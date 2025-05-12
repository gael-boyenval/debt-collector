import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getFileList } from './getFileList.js'
import { glob } from 'glob'
import { getChangedFilesSinceRev } from '../git/index.js'

// Mock dependencies
vi.mock('glob', () => ({
  glob: {
    sync: vi.fn(),
  },
}))

vi.mock('../git', () => ({
  getChangedFilesSinceRev: vi.fn(),
}))

describe('getFileList', () => {
  const mockConfig = {
    include: ['**/*.ts', '**/*.tsx'],
    exclude: ['**/node_modules/**', '**/dist/**'],
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return empty array when no files match glob patterns', async () => {
    vi.mocked(glob.sync).mockReturnValue([])

    const result = await getFileList({
      config: mockConfig,
      commonAncestor: false,
    })
    expect(result).toEqual([])
  })

  it('should return files matching glob patterns', async () => {
    const mockFiles = ['./src/file1.ts', './src/file2.tsx', './test/file3.ts']
    vi.mocked(glob.sync).mockReturnValue(mockFiles)

    const result = await getFileList({
      config: mockConfig,
      commonAncestor: false,
    })
    expect(result).toEqual(['src/file1.ts', 'src/file2.tsx', 'test/file3.ts'])
  })

  it('should handle custom glob option', async () => {
    const mockFiles = ['./src/file1.ts']
    vi.mocked(glob.sync).mockReturnValue(mockFiles)

    const result = await getFileList({
      config: mockConfig,
      commonAncestor: false,
      compare: undefined,
      globOption: '**/*.ts',
    })
    expect(result).toEqual(['src/file1.ts'])
  })

  it('should handle git comparison mode', async () => {
    const mockChangedFiles = [
      { filePath: 'src/file1.ts', status: 'M' },
      { filePath: 'src/file2.tsx', status: 'A' },
    ]
    vi.mocked(getChangedFilesSinceRev).mockResolvedValue(mockChangedFiles)

    const result = await getFileList({
      config: mockConfig,
      commonAncestor: false,
      compare: 'HEAD~1',
    })
    expect(result).toEqual(['src/file1.ts', 'src/file2.tsx'])
  })

  it('should filter out ignored files in git comparison mode', async () => {
    const mockChangedFiles = [
      { filePath: 'src/file1.ts', status: 'M' },
      { filePath: 'node_modules/package/file.ts', status: 'M' },
      { filePath: 'dist/file.ts', status: 'M' },
    ]
    vi.mocked(getChangedFilesSinceRev).mockResolvedValue(mockChangedFiles)

    const result = await getFileList({
      config: mockConfig,
      commonAncestor: false,
      compare: 'HEAD~1',
    })
    expect(result).toEqual(['src/file1.ts'])
  })

  it('should handle errors in glob mode', async () => {
    vi.mocked(glob.sync).mockImplementation(() => {
      throw new Error('Glob error')
    })

    await expect(
      getFileList({
        config: mockConfig,
        commonAncestor: false,
      })
    ).rejects.toThrow('Glob error')
  })

  it('should handle errors in git comparison mode', async () => {
    vi.mocked(getChangedFilesSinceRev).mockRejectedValue(new Error('Git error'))

    await expect(
      getFileList({
        config: mockConfig,
        commonAncestor: false,
        compare: 'HEAD~1',
      })
    ).rejects.toThrow('Git error')
  })
})
