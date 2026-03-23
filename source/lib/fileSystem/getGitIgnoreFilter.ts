import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import ignore, { type Ignore } from 'ignore'

const getGitRootDir = (): string | null => {
  try {
    return execSync('git rev-parse --show-toplevel', {
      encoding: 'utf-8',
    }).trim()
  } catch {
    return null
  }
}

// Cached per cwd — the .gitignore doesn't change during a single run.
const cache = new Map<string, Ignore | null>()

/** Clears the memoization cache. Exposed for testing only. */
export const clearGitIgnoreFilterCache = (): void => cache.clear()

/**
 * Reads .gitignore from the git repository root and returns
 * an `ignore` instance that can test file paths.
 * Returns `null` if not in a git repo or no .gitignore is found.
 *
 * Result is memoized per working directory to avoid repeated
 * `git rev-parse` subprocess calls (notably during `walk` iterations).
 */
export const getGitIgnoreFilter = (): Ignore | null => {
  const cwd = process.cwd()
  if (cache.has(cwd)) return cache.get(cwd)!

  const gitRoot = getGitRootDir()
  if (!gitRoot) {
    cache.set(cwd, null)
    return null
  }

  try {
    const content = fs.readFileSync(
      path.join(gitRoot, '.gitignore'),
      'utf-8'
    )
    const filter = ignore().add(content)
    cache.set(cwd, filter)
    return filter
  } catch {
    cache.set(cwd, null)
    return null
  }
}
