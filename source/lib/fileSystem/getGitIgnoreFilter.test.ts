import { describe, it, expect, vi, afterEach } from 'vitest'
import fs from 'fs'
import { execSync } from 'child_process'
import { getGitIgnoreFilter, clearGitIgnoreFilterCache } from './getGitIgnoreFilter.js'

vi.mock('fs')
vi.mock('child_process', () => ({
  execSync: vi.fn(),
}))

afterEach(() => {
  clearGitIgnoreFilterCache()
  vi.restoreAllMocks()
})

describe('getGitIgnoreFilter', () => {
  const mockGitRoot = (root: string = '/projects/my-repo') => {
    vi.mocked(execSync).mockReturnValue(`${root}\n`)
  }

  it('should return an ignore filter when .gitignore exists', () => {
    mockGitRoot()
    vi.mocked(fs.readFileSync).mockReturnValue('node_modules\ndist\n*.log')

    const filter = getGitIgnoreFilter()

    expect(filter).not.toBeNull()
    expect(filter!.ignores('node_modules/package/index.js')).toBe(true)
    expect(filter!.ignores('dist/bundle.js')).toBe(true)
    expect(filter!.ignores('error.log')).toBe(true)
    expect(filter!.ignores('src/index.ts')).toBe(false)
  })

  it('should read .gitignore from the git root, not cwd', () => {
    mockGitRoot('/projects/my-repo')
    vi.mocked(fs.readFileSync).mockReturnValue('dist')

    getGitIgnoreFilter()

    expect(fs.readFileSync).toHaveBeenCalledWith(
      expect.stringContaining('my-repo'),
      'utf-8'
    )
  })

  it('should return null when not in a git repository', () => {
    vi.mocked(execSync).mockImplementation(() => {
      throw new Error('not a git repository')
    })

    const filter = getGitIgnoreFilter()
    expect(filter).toBeNull()
  })

  it('should return null when .gitignore does not exist', () => {
    mockGitRoot()
    vi.mocked(fs.readFileSync).mockImplementation(() => {
      throw new Error('ENOENT')
    })

    const filter = getGitIgnoreFilter()
    expect(filter).toBeNull()
  })

  it('should handle comments and empty lines in .gitignore', () => {
    mockGitRoot()
    vi.mocked(fs.readFileSync).mockReturnValue(
      '# dependencies\nnode_modules\n\n# build\ndist\n'
    )

    const filter = getGitIgnoreFilter()

    expect(filter).not.toBeNull()
    expect(filter!.ignores('node_modules/foo.js')).toBe(true)
    expect(filter!.ignores('dist/main.js')).toBe(true)
    expect(filter!.ignores('src/app.ts')).toBe(false)
  })

  it('should handle negation patterns', () => {
    mockGitRoot()
    vi.mocked(fs.readFileSync).mockReturnValue('*.log\n!important.log')

    const filter = getGitIgnoreFilter()

    expect(filter).not.toBeNull()
    expect(filter!.ignores('error.log')).toBe(true)
    expect(filter!.ignores('important.log')).toBe(false)
  })
})
