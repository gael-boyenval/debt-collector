import fs from 'fs'
import path from 'path'
import { getFileList } from '../../lib/filters/getFileList.js'
import { checkFileList } from '../../lib/results/checkFileList.js'
import type { Config, FileResults, WalkLoopResult } from '../../lib/types.js'

export const getCommitResult = async ({
  previousResult,
  sanitizedConfig,
  include,
  previousHash,
}: {
  previousResult: WalkLoopResult | null
  sanitizedConfig: Config
  include: string[] | null
  previousHash?: string | null
}): Promise<{ [filePath: string]: FileResults }> => {
  // console.log('previousHash', previousHash)
  // console.log('include', include)

  // get changed files
  const fileList = await getFileList({
    config: sanitizedConfig as Config,
    commonAncestor: false,
    compare: previousHash ?? undefined,
    globOption: include ?? [],
  })

  // console.log('fileList', fileList)

  // test changed files
  const fileResults = await checkFileList({
    fileList,
    config: sanitizedConfig as Config,
    rule: undefined,
    tags: undefined,
    increment: () => null,
  })

  // create an object of file results
  let mergedResults = fileResults.reduce<{ [key: string]: FileResults }>(
    (acc, res) => {
      acc[res.filePath] = res
      return acc
    },
    {}
  )

  if (previousResult) {
    // merging previous results with the new ones
    mergedResults = {
      ...previousResult,
      ...mergedResults,
    }

    // testing for deleted, moved or rennamed files, and removing them from the results
    mergedResults = Object.keys(mergedResults).reduce(
      (acc, filePath) => {
        const fileStillExist = fs.existsSync(
          path.resolve(process.cwd(), `./${filePath}`)
        )
        if (fileStillExist) {
          acc[filePath] = mergedResults[filePath]!
        }

        return acc
      },
      {} as { [key: string]: FileResults }
    )
  }

  return mergedResults
}
