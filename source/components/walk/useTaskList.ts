type TaskListOptions = {
  isConfigValid: boolean | null
  isReady: boolean
  isHistoryDirty: boolean | null
  isFinished: boolean
  revlength: number
  currentCommit: {
    commit: string
    index: number
  }
  isGitReady: boolean
}

type State = 'loading' | 'pending' | 'success' | 'warning' | 'error'

export type TaskProps = {
  state: State
  label: string
  status: string
}

export const useTaskList = ({
  isConfigValid,
  isReady,
  isHistoryDirty,
  currentCommit,
  isGitReady,
  isFinished,
  revlength,
}: TaskListOptions): TaskProps[] => {
  const checkGitHistoryState: State = (() => {
    if (!isGitReady) return 'loading'
    if (isGitReady && !isHistoryDirty) return 'success'
    if (isGitReady && isHistoryDirty) return 'error'
    return 'pending'
  })()

  const checkGitHistory = {
    state: checkGitHistoryState,
    label: 'check git history',
    status:
      checkGitHistoryState === 'loading'
        ? 'checking git history'
        : checkGitHistoryState,
  }

  const configTaskState: State = (() => {
    if (isConfigValid === null) return 'loading'
    if (isConfigValid && !isHistoryDirty) return 'success'
    if (!isConfigValid || isHistoryDirty) return 'error'
    return 'pending'
  })()

  const configTask = {
    state: configTaskState,
    label: 'load and validate configuration',
    status:
      configTaskState === 'loading'
        ? 'validating configuration'
        : configTaskState,
  }

  const walkTaskState: State = (() => {
    if (!isReady && configTaskState === 'success') return 'loading'
    if (isReady && !isHistoryDirty) return 'success'
    if (isHistoryDirty) return 'error'
    return 'pending'
  })()

  const walkTask = {
    state: walkTaskState,
    label: `checking the last ${revlength} commits`,
    status:
      walkTaskState === 'loading'
        ? `checking commit ${currentCommit.index}/${revlength} : ${currentCommit.commit}`
        : walkTaskState,
  }

  const reportTaskState: State = (() => {
    if (walkTaskState !== 'success' && walkTaskState !== 'error')
      return 'pending'
    if (walkTaskState === 'success' && !isFinished) return 'loading'
    if (walkTaskState === 'success' && isFinished) return 'success'
    return 'error'
  })()

  const reportTask = {
    state: reportTaskState,
    label: `build a report`,
    status:
      reportTaskState === 'loading' ? `building html report` : walkTaskState,
  }

  return [checkGitHistory, configTask, walkTask, reportTask]
}
