import { describe, it, expect, vi, beforeEach } from 'vitest'
import { runWithConcurrency } from './promiseConcurrency.js'

describe('runWithConcurrency', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  // Helper function to create a delayed promise
  const createDelayedPromise = <T>(value: T, delay: number): Promise<T> =>
    new Promise((resolve) => {
      setTimeout(() => resolve(value), delay)
    })

  it('should run tasks with specified concurrency limit', async () => {
    const startTimes: number[] = []
    const tasks = Array.from({ length: 5 }, (_, i) => () => {
      startTimes.push(Date.now())
      return createDelayedPromise(`Task ${i}`, 100)
    })

    const promise = runWithConcurrency(tasks, 2)

    // Fast-forward time to complete all tasks
    await vi.runAllTimersAsync()
    await promise

    // Check that only 2 tasks started at the same time
    const timeDiffs = startTimes.slice(1).map((time, i) => time - startTimes[i])
    const maxConcurrent = Math.max(
      ...timeDiffs.map((diff) => (diff < 100 ? 1 : 0))
    )
    expect(maxConcurrent).toBeLessThanOrEqual(2)
  })

  it('should handle errors gracefully', async () => {
    const tasks = [
      () => Promise.resolve('success'),
      () => Promise.reject(new Error('failure')),
      () => Promise.resolve('success'),
    ]

    const results = await runWithConcurrency(tasks, 2)

    expect(results).toHaveLength(3)
    expect(results[0]).toEqual({ status: 'fulfilled', value: 'success' })
    expect(results[1]).toEqual({
      status: 'rejected',
      error: new Error('failure'),
    })
    expect(results[2]).toEqual({ status: 'fulfilled', value: 'success' })
  })

  it('should respect delay between tasks', async () => {
    const startTimes: number[] = []
    const tasks = Array.from({ length: 3 }, (_, i) => () => {
      startTimes.push(Date.now())
      return createDelayedPromise(`Task ${i}`, 50)
    })

    const promise = runWithConcurrency(tasks, 1, { delayBetweenTasks: 100 })

    // Fast-forward time to complete all tasks
    await vi.runAllTimersAsync()
    await promise

    // Check that tasks started with at least 100ms delay between them
    const timeDiffs = startTimes.slice(1).map((time, i) => time - startTimes[i])
    expect(Math.min(...timeDiffs)).toBeGreaterThanOrEqual(100)
  })

  it('should handle empty task array', async () => {
    const results = await runWithConcurrency([], 2)
    expect(results).toEqual([])
  })

  it('should handle single task', async () => {
    const task = () => Promise.resolve('single')
    const results = await runWithConcurrency([task], 2)
    expect(results).toEqual([{ status: 'fulfilled', value: 'single' }])
  })

  it('should maintain task order in results', async () => {
    const tasks = Array.from(
      { length: 5 },
      (_, i) => () => createDelayedPromise(i, Math.random() * 100)
    )

    const promise = runWithConcurrency(tasks, 2)

    // Fast-forward time to complete all tasks
    await vi.runAllTimersAsync()
    const results = await promise

    // Check that results are in the same order as input tasks
    results.forEach((result, i) => {
      expect(result.status).toBe('fulfilled')
      if (result.status === 'fulfilled') {
        expect(result.value).toBe(i)
      }
    })
  })

  it('should handle non-Error rejections', async () => {
    const tasks = [
      () => Promise.reject('string error'),
      () => Promise.reject(123),
      () => Promise.reject({ message: 'object error' }),
    ]

    const results = await runWithConcurrency(tasks, 2)

    results.forEach((result) => {
      expect(result.status).toBe('rejected')
      if (result.status === 'rejected') {
        expect(result.error).toBeInstanceOf(Error)
      }
    })
  })
})
