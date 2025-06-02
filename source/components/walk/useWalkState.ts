import { useState, useEffect } from 'react'
import { useValidatedConfig } from '../../lib/config/index.js'
import { useGitUtils } from '../../lib/git/index.js'
import { TaskProps, useTaskList } from './useTaskList.js'
import { getTagListFromConfig } from '../../lib/config/getTagListFromConfig.js'
import { getCommitResult } from './getCommitResult.js'
import { formatWalkResults } from './formatWalkResults.js'
import { getEndDatesEstimations } from './getEndDatesEstimations.js'
import buildWalkReport from '../../lib/reporters/buildWalkReport.js'
import buildWalkEntries from '../../lib/reporters/buildWalkEntries.js'

import fs from 'fs'

import {
  Config,
  WalkResults,
  WalkLoopResult,
  WalkReportTagList,
  UserConfig,
  WalkReportData,
} from '../../lib/types.js'

import { useDevLogger, DevLogger } from '../hooks/useDevLogger.js'
import { filterNoScoresFilesFromWalkResult } from './filterNoScoresFilesFromWalkResult.js'

type WalkOptions = {
  config?: string
  // include?: string[]
  openReport?: boolean
}

type UseWalkStateResult = {
  results: WalkResults | null
  currentCommit: { commit: string; index: number }
  isHistoryDirty: boolean | null
  isReady: boolean | null
  tags: WalkReportTagList
  tasks: TaskProps[]
  logs: DevLogger['logs']
  isFinished: boolean
}

export const useWalkState = (walkOptions: WalkOptions): UseWalkStateResult => {
  const { config, openReport } = walkOptions

  const logger = useDevLogger()

  const [results, setResults] = useState<WalkResults | null>(null)
  const [currentCommit, setCurrentCommit] = useState({ commit: '', index: 0 })
  const [isReady, setIsReady] = useState(false)
  const [tags, setTags] = useState<WalkReportTagList>({})
  const [isFinished, setIsFinished] = useState(false)

  const { isConfigValid, sanitizedConfig, userConfig } =
    useValidatedConfig(config)

  const {
    isGitReady,
    walkCommits,
    checkoutTo,
    currentBranch,
    revList,
    isHistoryDirty,
  } = useGitUtils(sanitizedConfig as Config)

  const revlength =
    isConfigValid && sanitizedConfig?.walkConfig?.limit
      ? sanitizedConfig.walkConfig.limit
      : '?'

  const tasks = useTaskList({
    isConfigValid,
    isReady,
    isHistoryDirty,
    isFinished,
    revlength: Number(revlength),
    currentCommit,
    isGitReady,
  })

  useEffect(() => {
    ;(async () => {
      if (isConfigValid && isGitReady && isHistoryDirty === false) {
        setTags(getTagListFromConfig(sanitizedConfig))

        const walkResults = await walkCommits<WalkResults, WalkLoopResult>(
          revList?.reverse() ?? [],
          {
            onCommitChange: async ({ rev, index, previousResult }) => {
              setCurrentCommit({ commit: rev.name, index: index || 0 + 1 })

              const results = await getCommitResult({
                previousResult: previousResult?.results ?? null,
                sanitizedConfig,
                include: sanitizedConfig?.include ?? null,
                previousHash: previousResult?.rev?.hash,
              })

              logger.info(
                `${rev.name} - ${Object.keys(results).length} files`,
                results
              )

              return results
            },

            onError: (error) => {
              console.log(error)
            },

            onEnd: async (results: WalkResults) => {
              await checkoutTo(currentBranch ?? '')
              return results
            },
          }
        )

        setResults(walkResults)

        setIsReady(true)
      }
    })()
  }, [isConfigValid, isGitReady, isHistoryDirty])

  useEffect(() => {
    ;(async () => {
      if (isReady) {
        const hasPackagesConfig =
          isConfigValid && !!sanitizedConfig?.walkConfig?.report?.packages

        const reports = hasPackagesConfig
          ? (sanitizedConfig?.walkConfig?.report?.packages ?? {})
          : { global: sanitizedConfig?.include ?? [] }

        const reportsLinks = Object.keys(reports).map((report) => ({
          name: report,
          link: `./report-${report}.html`,
        }))

        Object.keys(reports).forEach((reportName) => {
          const formatedResult = formatWalkResults({
            config: sanitizedConfig as Config,
            results: results as WalkResults,
            globFilter: reports[reportName as keyof typeof reports] as string,
            hasPackagesConfig: hasPackagesConfig ?? false,
          })
          // console.log('formatedResult', userConfig)
          const endDateEstimations = getEndDatesEstimations({
            config: sanitizedConfig as Config,
            results: formatedResult,
          })

          buildWalkReport({
            userConfig: userConfig as UserConfig,
            tags,
            results: formatedResult as any,
            endDateEstimations,
            reportName,
            reportsLinks,
          })
        })

        buildWalkEntries(reportsLinks, openReport)
        const cachePath = `${process.cwd()}/node_modules/.cache/debt-collector`

        if (sanitizedConfig && results) {
          const walkReportData: WalkReportData = {
            config: sanitizedConfig,
            results,
          }

          const filteredResults =
            filterNoScoresFilesFromWalkResult(walkReportData)

          fs.mkdir(cachePath, { recursive: true }, (err) => {
            if (err) throw err
            fs.writeFileSync(
              `${cachePath}/${sanitizedConfig.projectName}-results.json`,
              JSON.stringify(filteredResults, null, 2)
            )
          })
        }

        setIsFinished(true)
      }
    })()
  }, [isReady])

  return {
    tasks,
    results,
    currentCommit,
    isHistoryDirty,
    isReady,
    tags,
    logs: logger.logs,
    isFinished,
  }
}
