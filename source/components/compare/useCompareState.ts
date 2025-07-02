import { useState, useEffect } from 'react'
import {
  CompareGetFileListOptions,
  getFileList,
} from '../../lib/filters/getFileList.js'
import { checkFileList } from '../../lib/results/checkFileList.js'
import { useValidatedConfig } from '../../lib/config/index.js'
import { useGitUtils } from '../../lib/git/index.js'
import type { FileResults, Config, BrokenRule } from '../../lib/types.js'

type CompareOptions = {
  rule?: string
  tags?: string[]
  config?: string
  include?: string
  revision?: string
  commonAncestor?: boolean
}

type FileResult = {
  previousRevResult: {
    totalScore: number
    brokenRules: BrokenRule[]
  }
  currentRevResult: {
    totalScore: number
    brokenRules: BrokenRule[]
  }
  tendency: number
}

export function useCompareState(options: CompareOptions) {
  const { revision, rule, tags, config, include, commonAncestor } = options

  const [results, setResults] = useState<FileResults[] | null>(null)
  const [fileList, setFileList] = useState<string[] | null>(null)
  const [checkedFileCount, setCheckedFileCount] = useState(0)
  const [revisionResults, setRevisionResults] = useState<FileResults[] | null>(
    null
  )
  const [checkedRevisionFileCount, setRevisionCheckedFileCount] = useState(0)
  const [finalResult, setFinalResult] = useState<
    Record<string, FileResult>[] | null
  >(null)

  const { isConfigValid, sanitizedConfig, configErrors } =
    useValidatedConfig(config)
  const { isGitReady, checkoutTo, currentBranch } = useGitUtils(
    sanitizedConfig as Config
  )

  useEffect(() => {
    ;(async () => {
      if (isConfigValid && isGitReady) {
        const fileListResult = await getFileList({
          config: sanitizedConfig as Config,
          commonAncestor: !!commonAncestor,
          compare: revision,
          globOption: include,
        } as CompareGetFileListOptions)
        setFileList(fileListResult)
      }
    })()
  }, [isConfigValid, isGitReady])

  useEffect(() => {
    ;(async () => {
      if (fileList !== null && sanitizedConfig !== null) {
        const incrementFn = () =>
          setCheckedFileCount((prevCount) => prevCount + 1)
        const checkResult = await checkFileList({
          fileList,
          config: sanitizedConfig,
          rule,
          tags,
          increment: incrementFn,
        })
        setResults(checkResult)
      }
    })()
  }, [fileList])

  useEffect(() => {
    ;(async () => {
      if (
        results !== null &&
        fileList !== null &&
        sanitizedConfig !== null &&
        revision
      ) {
        try {
          await checkoutTo(revision)
        } catch (e) {
          console.log(e)
        }
        const incrementFn = () =>
          setRevisionCheckedFileCount((prevCount) => prevCount + 1)
        const result = await checkFileList({
          fileList,
          config: sanitizedConfig,
          rule,
          tags,
          increment: incrementFn,
        })
        setRevisionResults(result)
      }
    })()
  }, [results])

  useEffect(() => {
    ;(async () => {
      if (revisionResults !== null && currentBranch) {
        try {
          await checkoutTo(currentBranch)
        } catch (err) {
          console.log(err)
        }

        const finalResults = fileList?.reduce(
          (acc, fileName) => {
            const currentScore =
              results?.find(({ filePath }) => filePath === fileName)
                ?.totalScore ?? 0

            const revisionScore =
              revisionResults?.find(({ filePath }) => filePath === fileName)
                ?.totalScore ?? 0

            const revisionBrokenRules =
              revisionResults?.find(({ filePath }) => filePath === fileName)
                ?.brokenRules ?? []

            const currentBrokenRules =
              results?.find(({ filePath }) => filePath === fileName)
                ?.brokenRules ?? []

            const tendency = currentScore - revisionScore

            acc[fileName] = {
              previousRevResult: {
                totalScore: revisionScore,
                brokenRules: revisionBrokenRules,
              },
              currentRevResult: {
                totalScore: currentScore,
                brokenRules: currentBrokenRules,
              },
              tendency,
            }
            return acc
          },
          {} as Record<string, FileResult>
        )

        setFinalResult(finalResults ? [finalResults] : null)
      }
    })()
  }, [revisionResults])

  useEffect(() => {
    ;(async () => {
      if (finalResult !== null && currentBranch) {
        await checkoutTo(currentBranch)
      }
    })()
  }, [finalResult])

  return {
    results,
    fileList,
    checkedFileCount,
    revisionResults,
    checkedRevisionFileCount,
    finalResult,
    isConfigValid,
    configErrors,
    sanitizedConfig,
    currentBranch,
    revision,
  }
}
