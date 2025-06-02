import { useState, useEffect } from 'react'
import {
  CheckGetFileListOptions,
  getFileList,
} from '../../lib/filters/getFileList.js'
import { checkFileList } from '../../lib/results/checkFileList.js'
import { useValidatedConfig } from '../../lib/config/index.js'
import { cleanTagFilterParam } from '../../lib/utils/index.js'
import type { CheckResults } from '../../lib/types.js'
import { useDevLogger } from '../hooks/useDevLogger.js'

type CheckOptions = {
  rule?: string
  tags?: string[]
  config?: string
  include?: string
  changedSince?: string
}

export function useCheckState(options: CheckOptions) {
  const { rule, tags, config, include, changedSince } = options

  const logger = useDevLogger()

  const [results, setResults] = useState<CheckResults | null>(null)
  const [fileList, setFileList] = useState<string[] | null>(null)
  const [checkedFileCount, setCheckedFileCount] = useState<number>(0)
  const [error, setError] = useState<string[] | null>(null)

  const { isConfigValid, sanitizedConfig, configErrors } =
    useValidatedConfig(config)

  const cleanTags = cleanTagFilterParam(tags)

  useEffect(() => {
    ;(async () => {
      if (isConfigValid) {
        try {
          logger.info('Getting file list')
          const result = await getFileList({
            config: sanitizedConfig,
            commonAncestor: false,
            compare: changedSince,
            globOption: include,
          } as CheckGetFileListOptions)
          setFileList(result)
          setError(null)
        } catch (err) {
          setFileList(null)
          setError([
            err instanceof Error ? err.message : 'Unknown error occurred',
          ])
        }
      }
    })()
  }, [isConfigValid])

  useEffect(() => {
    ;(async () => {
      if (fileList !== null && sanitizedConfig !== null) {
        const incrementFn = () => {
          setCheckedFileCount((prevCount: number): number => prevCount + 1)
        }
        const checkResults = await checkFileList({
          fileList,
          config: sanitizedConfig,
          rule,
          tags,
          increment: incrementFn,
        })

        setResults({
          results: checkResults,
          config: sanitizedConfig,
        })
      }
    })()
  }, [fileList])

  const collectingFrom = `Collecting debt from ${
    changedSince
      ? `files changed since ${changedSince}`
      : include || 'all files'
  }`
  const hasFilters = Boolean(cleanTags.length || rule)
  const tagFilters = cleanTags.length > 0 ? `[tags : ${cleanTags}]` : ''
  const and = cleanTags.length > 0 && rule ? ' & ' : ''
  const ruleFilter = rule ? `[rule id : ${rule}]` : ''
  const withFilters = `With rules filters on ${tagFilters}${and}${ruleFilter}`

  return {
    results,
    fileList,
    checkedFileCount,
    isConfigValid: isConfigValid && !error,
    configErrors: configErrors || error,
    collectingFrom,
    hasFilters,
    withFilters,
  }
}
