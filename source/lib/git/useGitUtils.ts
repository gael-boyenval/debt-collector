import { useEffect, useState } from 'react'
import type { Config } from '../config'
import {
  getIsHistoryDirty,
  getCurrentBranch,
  checkoutTo,
  getRevList,
  walkCommits,
} from './gitUtils'
import type { GitRev } from '../results/results'

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
  revList: GitRev[] | null
  gitErrors: GitError[] | null
}

const useGitUtils = (config: Config): GitUtils => {
  const [isGitReady, setIsGitReady] = useState<boolean>(false)
  const [currentBranch, setCurrentBranch] = useState<null | string>(null)
  const [isHistoryDirty, setIsHistoryDirty] = useState<null | boolean>(null)
  const [revList, setRevList] = useState<null | string[]>(null)
  const [gitErrors, setGitErrors] = useState<GitError[]>([])

  useEffect(() => {
    if (config) {
      ;(async () => {
        try {
          const currentBranchRes = await getCurrentBranch()
          const isHistoryDirtyRes = await getIsHistoryDirty()
          setCurrentBranch(currentBranchRes)
          setIsHistoryDirty(isHistoryDirtyRes)

          if (config.walkConfig?.gitCommand && config.walkConfig?.parser) {
            const { gitCommand, parser, limit } = config.walkConfig
            const revListRes = await getRevList(gitCommand, parser, limit)
            setRevList(revListRes)
          }

          setIsGitReady(true)
        } catch (e) {
          setGitErrors(
            gitErrors.push([
              {
                errorType: 'GIT_ERROR',
                message: e.message,
              },
            ])
          )
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
  }
}

export default useGitUtils
