type TaskResult<T> =
  | {
      status: 'fulfilled'
      value: T
    }
  | {
      status: 'rejected'
      error: Error
    }

type Options = {
  /** Delay in milliseconds between starting each task (default: 0) */
  delayBetweenTasks?: number
}

/**
 * Executes an array of promise-returning functions with a maximum concurrency limit.
 * @param tasks Array of functions that return promises
 * @param concurrency Maximum number of promises to run simultaneously
 * @param options Additional options for controlling execution
 * @returns Promise that resolves with an array of results in the same order as input tasks
 */
export async function runWithConcurrency<T>(
  tasks: (() => Promise<T>)[],
  concurrency: number,
  options: Options = {}
): Promise<TaskResult<T>[]> {
  const { delayBetweenTasks = 0 } = options
  const results: TaskResult<T>[] = new Array(tasks.length)
  const inProgress = new Set<Promise<void>>()
  let taskIndex = 0
  let completedCount = 0

  // Function to run a single task
  async function runTask(index: number): Promise<void> {
    const task = tasks[index]
    if (!task) return

    try {
      const value = await task()
      results[index] = { status: 'fulfilled', value }
    } catch (error) {
      results[index] = {
        status: 'rejected',
        error: error instanceof Error ? error : new Error(String(error)),
      }
    }
    completedCount++
  }

  // Function to start next task from queue
  async function startNextTask(): Promise<void> {
    if (taskIndex >= tasks.length) return

    if (delayBetweenTasks > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayBetweenTasks))
    }

    const currentIndex = taskIndex++
    const promise = runTask(currentIndex)
    inProgress.add(promise)

    // When task completes, remove it from inProgress and start next task if available
    promise.then(() => {
      inProgress.delete(promise)
      if (taskIndex < tasks.length) {
        return startNextTask()
      }
      return Promise.resolve()
    })
  }

  // Initialize with maximum concurrent tasks
  const initialTasks = Math.min(concurrency, tasks.length)
  for (let i = 0; i < initialTasks; i++) {
    startNextTask()
  }

  // Wait for all tasks to complete
  while (inProgress.size > 0) {
    await Promise.all(inProgress)
  }

  return results
}
