import { glob } from 'glob'
import { mergeAndDedupArrays, filterIgnoredFiles } from '../utils/index.js'
import type { Config } from '../types.js'
import { getChangedFilesSinceRev } from '../git/index.js'

const removeDotSlash = (str: string): string => str.replace(/^\.\//, '')

export type GetFileCommonOptions = {
  config: Config
  globOption?: string | string[]
}

export type CheckGetFileListOptions = GetFileCommonOptions & {
  commonAncestor: false
  compare?: string
}

export type CompareGetFileListOptions = GetFileCommonOptions & {
  commonAncestor: boolean
  compare: string
}

type WalkGetFileListOptions = GetFileCommonOptions & {
  commonAncestor: false
  compare?: string
}

type GetFileListOptions =
  | CheckGetFileListOptions
  | CompareGetFileListOptions
  | WalkGetFileListOptions

export const getFileList = async ({
  config,
  commonAncestor,
  compare,
  globOption,
}: GetFileListOptions): Promise<string[]> => {
  let includedGlob = []

  if (globOption) {
    if (Array.isArray(globOption)) {
      includedGlob = globOption
    } else {
      includedGlob = [globOption]
    }
  } else {
    includedGlob = config.include
  }

  if (compare) {
    return new Promise(async (resolve, reject) => {
      try {
        const changedFiles = await getChangedFilesSinceRev(
          compare,
          commonAncestor
        )
        // const ignoreDeletedfiles = changedFiles.filter(({ status }) => status === 'A' || status === 'M')
        const allChanges = changedFiles.map((item) => item.filePath)

        const files = filterIgnoredFiles(
          allChanges,
          config.exclude,
          includedGlob
        )

        resolve(files)
      } catch (error) {
        reject(error)
      }
    })
  }

  return new Promise((resolve, reject) => {
    try {
      const globOptions = {
        ignore: config?.exclude ?? [],
        nodir: true,
        root: process.cwd(),
      }

      const filesFromSource = includedGlob.map((globFilter) =>
        glob.sync(globFilter, globOptions)
      )

      const files =
        mergeAndDedupArrays<string>(filesFromSource).map(removeDotSlash)

      resolve(files)
    } catch (error) {
      reject(error)
    }
  })
}
