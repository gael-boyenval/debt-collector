import getFileResult from './getFileResult.js'
import { filtersRulesFromOptions } from '../filters/filterRules.js'
import { runWithConcurrency } from '../utils/promiseConcurrency.js'
import type { FileResults, Config } from '../types.js'

export const checkFileList = async ({
  fileList,
  config,
  rule,
  tags,
  increment,
}: {
  fileList: string[]
  config: Config
  rule: string | undefined
  tags: string[] | undefined
  increment: () => void
}): Promise<FileResults[]> => {
  const filteredRules = filtersRulesFromOptions(config, rule, tags)

  const fileListConfig = {
    ...config,
    ...filteredRules,
  }

  if (fileList.length === 0) {
    return []
  }

  const tasks = fileList.map(
    (file) => () => getFileResult(fileListConfig, file, increment)
  )

  const results = await runWithConcurrency(tasks, 20, { delayBetweenTasks: 0 })

  // Filter out any rejected results and return only successful ones
  return results
    .filter(
      (result): result is { status: 'fulfilled'; value: FileResults } =>
        result.status === 'fulfilled'
    )
    .map((result) => result.value)
}
