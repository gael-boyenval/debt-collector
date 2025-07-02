import { useState, useEffect } from 'react'
import { useValidatedConfig } from '../../lib/config/index.js'
import { useGitUtils } from '../../lib/git/index.js'
import { TaskProps, useTaskList } from './useTaskList.js'
import { getTagListFromConfig } from '../../lib/config/getTagListFromConfig.js'
import { getCommitResult } from './getCommitResult.js'
import path from 'path'
import { execSync, exec } from 'child_process'

import fs from 'fs'

import {
  Config,
  WalkResults,
  WalkLoopResult,
  WalkReportTagList,
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
  configErrors: string[] | null
  isConfigValid: boolean | null
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

  const { isConfigValid, sanitizedConfig, configErrors } =
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

            if (openReport) {
              try {
                fs.writeFileSync(
                  `${cachePath}/projects-config.json`,
                  JSON.stringify(
                    {
                      projects: [
                        {
                          name: sanitizedConfig.projectName,
                          description: 'unknown',
                          publicUrl: 'unknown',
                          repoUrl: 'unknown',
                          resultTag: sanitizedConfig.projectName,
                        },
                      ],
                    },
                    null,
                    2
                  )
                )
                const __dirname = import.meta.url
                const executionPath = path
                  .dirname(__dirname.replace('file://', ''))
                  .split(path.sep)
                const distPathIndex = executionPath.lastIndexOf('dist')
                const dashboardPath =
                  executionPath.slice(0, distPathIndex + 1).join(path.sep) +
                  path.sep +
                  'dashboard'
                execSync(`cp -L -R ${dashboardPath}/* ${cachePath}`)

                const serve = exec(`npx serve ${cachePath}`)

                serve.stdout?.on('data', (data) => {
                  console.log(`dashboard server: ${data}`)
                })
              } catch (e) {
                // eslint-disable-next-line no-console
                console.log(
                  'tried to open file but could not... it may be because we are in a virtual env'
                )
                console.log(e)
              }
            }
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
    configErrors,
    isConfigValid,
    isHistoryDirty,
    isReady,
    tags,
    logs: logger.logs,
    isFinished,
  }
}
