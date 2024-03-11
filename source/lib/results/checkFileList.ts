import Queue from 'queue-promise'
import { ESLint } from 'eslint'
import getFileResult from './getFileResult'
import { filtersRulesFromOptions } from '../filters/filterRules'
import type { FileResults, Config } from '../types'

const checkFileList = async (
  fileList: string[],
  config: Config,
  rule: string,
  tags: string[],
  increment: () => void
): Promise<FileResults[]> =>
  new Promise((resolve) => {
    const queue = new Queue({
      concurrent: 20,
      interval: 0,
    })

    const filteredRules = filtersRulesFromOptions(config, rule, tags)

    const fileListConfig = {
      ...config,
      ...filteredRules,
    }

    let eslint: ESLint | null = null

    if (config.eslintRules?.length > 0) {
      eslint = new ESLint({
        useEslintrc: false,
        baseConfig: config.eslintConfig,
      })
    }

    const results = []

    if (fileList.length === 0) {
      resolve(results)
    }

    queue.enqueue(
      fileList.map(
        (file) => () => getFileResult(fileListConfig, file, increment, eslint)
      )
    )

    queue.on('resolve', (data) => {
      results.push(data)
    })

    queue.on('end', () => resolve(results))
  })

export default checkFileList
