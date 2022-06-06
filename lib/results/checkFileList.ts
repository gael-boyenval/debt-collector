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
): Promise<FileResults[]> => {
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

  const getFilesResults = fileList.map((file) =>
    getFileResult(fileListConfig, file, increment, eslint)
  )

  const results = await Promise.all([...getFilesResults])

  return results
}

export default checkFileList
