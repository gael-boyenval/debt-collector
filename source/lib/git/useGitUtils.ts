import { useEffect, useState } from 'react'
import type { Config, GitRevision } from '../types.js'
import {
  getIsHistoryDirty,
  getCurrentBranch,
  checkoutTo,
  getRevList,
  walkCommits,
  execWalkCommand,
} from './gitUtils.js'

type GitError = {
  errorType: 'GIT_ERROR'
  message: string
}

type GitUtils = {
  isGitReady: boolean
  currentBranch: string | null
  isHistoryDirty: boolean | null
  checkoutTo: (branch: string) => Promise<void> | null
  walkCommits: typeof walkCommits
  revList: GitRevision[] | null
  gitErrors: GitError[] | null
  execWalkCommand: (command: string) => Promise<string> | null
}

const useGitUtils = (config: Config): GitUtils => {
  const [isGitReady, setIsGitReady] = useState<boolean>(false)
  const [currentBranch, setCurrentBranch] = useState<null | string>(null)
  const [isHistoryDirty, setIsHistoryDirty] = useState<null | boolean>(null)
  const [revList, setRevList] = useState<GitRevision[] | null>(null)
  const [gitErrors, setGitErrors] = useState<GitError[]>([])

  useEffect(() => {
    if (config) {
      ;(async () => {
        try {
          const currentBranchRes = await getCurrentBranch()
          const isHistoryDirtyRes = await getIsHistoryDirty()
          setCurrentBranch(currentBranchRes)
          setIsHistoryDirty(isHistoryDirtyRes)

          if (config.walkConfig?.gitCommand && !!config.walkConfig?.parser) {
            const { gitCommand, parser, limit } = config.walkConfig
            const revListRes: GitRevision[] = await getRevList(
              gitCommand,
              parser,
              limit
            )
            setRevList(revListRes)
          }

          setIsGitReady(true)
        } catch (e: unknown) {
          setGitErrors((prevErrors) => [
            ...prevErrors,
            {
              errorType: 'GIT_ERROR',
              message: e instanceof Error ? e.message : 'Unknown error',
            },
          ])
          setIsGitReady(true)
        }
      })()
    }
  }, [config])

  return {
    isGitReady,
    currentBranch,
    isHistoryDirty,
    checkoutTo,
    revList,
    gitErrors,
    walkCommits,
    execWalkCommand,
  }
}

export default useGitUtils
