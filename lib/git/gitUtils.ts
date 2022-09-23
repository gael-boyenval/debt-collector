/* eslint-disable no-await-in-loop, no-restricted-syntax */
import path from 'path'
import simpleGit, { SimpleGit } from 'simple-git'
import type { GitRevision } from '../types'

const gitOptions = {
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6,
}

const git: SimpleGit = simpleGit(gitOptions)

export const getIsHistoryDirty = async (): Promise<boolean> => {
  const status = await git.status()
  return status.files.length > 0
}

function timeout(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const checkoutTo = async (revision: string): Promise<void> => {
  await git.checkout([revision])
  // we need to make sure that file system is ready to be used, and finished the checkout
  await timeout(1000)
}

export const getCurrentBranch = async (): Promise<string> => {
  const currentBranch = await git.revparse(['--abbrev-ref', 'HEAD'])
  return currentBranch
}
export const execWalkCommand = async (command: string): Promise<string> =>
  git.raw(command.replace('git ', '').split(' '))

export const getRevList = async (
  command: string,
  parser: (result: string) => string[],
  limit = 10
): Promise<string[]> => {
  const commandResult = await git.raw(command.replace('git ', '').split(' '))
  const result = parser(commandResult)
  return result.slice(0, limit)
}

type OnCommitChange<IteratorResult> = ({
  rev,
  index,
  previousResult,
}: {
  rev: GitRevision
  index: number | null
  previousResult: WalkIteratorResult<IteratorResult> | null
}) => Promise<IteratorResult>

export type WalkIteratorResult<IteratorResult> = {
  rev: GitRevision
  results: IteratorResult | null
}

export const walkCommits = async <FinalResult, IteratorResult>(
  revList: GitRevision[],
  {
    onCommitChange,
    onError,
    onEnd,
  }: {
    onCommitChange: OnCommitChange<IteratorResult>
    onEnd: (
      result: WalkIteratorResult<IteratorResult>[]
    ) => Promise<FinalResult>
    onError: (error: string) => void
  }
): Promise<FinalResult | null> => {
  const isHistoryDirty = await getIsHistoryDirty()
  const currentBranch = await getCurrentBranch()

  let walkIteratorResults: WalkIteratorResult<IteratorResult>[] | null = null

  if (isHistoryDirty) {
    onError('You have uncommited changes, please commit or stash them')
    return null
  }

  try {
    // eslint-disable-next-line
    for (const [index, rev] of revList.entries()) {
      await git.checkout([rev.hash])
      const previousResult = walkIteratorResults?.[index - 1] ?? null

      const results = await onCommitChange({
        rev,
        index,
        previousResult,
      })

      if (!walkIteratorResults) {
        walkIteratorResults = []
      }

      walkIteratorResults.push({
        rev,
        results,
      })
    }
  } catch (e) {
    onError(e.message)
    await checkoutTo(currentBranch)
    console.log(e)
    return null
  }

  await checkoutTo(currentBranch)
  const results = await onEnd(walkIteratorResults)
  return results
}

export const getChangedFilesSinceRev = async (
  rev: string,
  commonAncestor = true
): Promise<{ status: string; filePath: string }[]> => {
  let results
  if (commonAncestor) {
    // get last common commit between rev and Head
    // avoid comparing Head with out of sync base branch
    const commit = await git.raw(['merge-base', rev, 'HEAD'])
    results = await git.diff([
      commit.replace('\n', ''),
      '--name-status',
      '--no-renames',
    ])
  } else {
    results = await git.diff([rev, '--name-status', '--no-renames'])
  }

  const rootGitDir = await git.revparse(['--show-toplevel'])
  const currentGitDir = path.relative(rootGitDir, process.cwd())

  const changedFilesSinceRev = results
    .replace(/\t/g, '|')
    .split('\n')
    .filter((item) => item !== '')
    .map((item) => {
      const [status, filePath] = item.split('|')

      return {
        status,
        filePath: path.relative(currentGitDir, filePath),
      }
    })

  return changedFilesSinceRev
}
