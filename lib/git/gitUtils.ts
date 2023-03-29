/* eslint-disable no-await-in-loop, no-restricted-syntax */
import path, { resolve } from 'path'
import simpleGit, { SimpleGit } from 'simple-git'
import minimatch from 'minimatch'
import Queue from 'queue-promise'
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

const daysFromNow = (date) => {
  function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24))
  }

  return datediff(new Date(date), Date.now())
}

const getFileChanges = async (file, sinceDays = 365) => {
  let fileResult
  try {
    fileResult = await git.raw([
      'log',
      '--pretty=format:%s|%ad',
      // `--since="${sinceDays} days ago"`,
      '--follow',
      '-M',
      file,
    ])
  } catch (err) {
    console.log(err)

    return null
  }

  const changes = fileResult.split('\n').filter((commit) => commit !== '')
  const lastModified = changes[0].split('|')[1]
  const firstCommitDate = changes.reverse()[0].split('|')[1]
  const changesSince = changes.filter((commit) => {
    const date = commit.split('|')[1]
    return daysFromNow(date) <= sinceDays
  })

  const sinceBaseRatio =
    daysFromNow(firstCommitDate) >= sinceDays
      ? 1
      : daysFromNow(firstCommitDate) / sinceDays

  const changeFrequency = changesSince.length / sinceBaseRatio
  const bugs = changesSince.filter((change) => change.includes(':bug:'))
  const bugFrequency = bugs.length / sinceBaseRatio

  return {
    file,
    changes: changesSince.length,
    bugs: bugs.length,
    changeFrequency,
    bugFrequency,
    creationDate: daysFromNow(firstCommitDate),
    lastModified: daysFromNow(lastModified),
  }
}

export const getMostModifiedFiles = async (): Promise<{
  [file: string]: {
    changes: number
    bugs: number
    changeFrequency: number
    bugFrequency: number
  }
}> =>
  new Promise((resolve, reject) => {
    console.log('new algo')
    git
      .raw(['ls-tree', 'next', '-r', '--name-only'])
      .then((allTrackedFiles) => {
        const formated = allTrackedFiles
          .split('\n')
          .filter((file) => file !== '')
          .filter((file) =>
            minimatch(file, 'packages/app-one-catalog/src/redux/**/*')
          )

        const queue = new Queue({
          concurrent: 100,
          interval: 0,
        })

        const results = []
        const count = 0

        const formatedlength = formated.length

        if (formated.length === 0) {
          resolve([])
        }

        queue.enqueue(formated.map((file) => () => getFileChanges(file)))

        queue.on('resolve', (data) => {
          count += 1
          console.log(`${count} / ${formatedlength}`)

          if (data) results.push(data)
          if (!data) console.log('a file failed')
        })

        queue.on('end', () => {
          const formatResults = results
            .sort((file1, file2) => {
              if (file1.changes > file2.changes) return -1
              if (file1.changes < file2.changes) return 1
              return 0
            })
            .slice(0, 300)
            .reduce((acc, item) => {
              acc[item.file] = {
                changes: item.changes,
                bugs: item.bugs,
                changeFrequency: item.changeFrequency,
                bugFrequency: item.bugFrequency,
                creationDate: item.creationDate,
                lastModified: item.lastModified,
              }

              return acc
            }, {})
          console.log(formatResults)
          resolve(formatResults)
        })
      })
      .catch((err) => {
        console.log(err)
      })

    // const formated = files
    //   .split('\n')
    //   .filter((file) => file !== '')
    //   .reduce((acc, file) => {
    //     if (!acc[file]) {
    //       acc[file] = 1
    //     } else {
    //       acc[file] += 1
    //     }
    //     return acc
    //   }, {})

    // const sorted = Object.keys(formated).sort((file1, file2) => {
    //   if (formated[file1] > formated[file2]) return -1
    //   if (formated[file1] < formated[file2]) return 1
    //   return 0
    // })

    // const sortedWithScore = sorted
    //   .filter((file) => minimatch(file, 'packages/*/src/**/*'))
    //   .filter((file) => fs.existsSync(file))
    //   .slice(0, 350)
    //   .reduce((acc, file) => {
    //     const lib = file.split('/')[1]
    //     const relativefileName = file.replace(`packages/${lib}`, '')

    //     if (!acc[lib]) {
    //       acc[lib] = {}
    //     }

    //     acc[lib][relativefileName] = formated[file]
    //     return acc
    //   }, {})

    // console.log(formated)

    // return formated
  })
