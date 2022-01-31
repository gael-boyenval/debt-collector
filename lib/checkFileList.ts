import { ESLint } from 'eslint'
import path from 'path'
import getFileResult from '../lib/getFileResult'
import { filtersRulesFromOptions } from '../lib/filterRules'

export default async (fileList, config, rule, tags, increment) => {
  const filteredRules = filtersRulesFromOptions(config, rule, tags);

  const fileListConfig = {
    ...config,
    ...filteredRules,
  }

  const	eslint = new ESLint({
    useEslintrc: false,
    baseConfig: require(path.resolve(process.cwd(), fileListConfig.eslintConfigPath)),
  });

  const getFilesResults = fileList.map(file => getFileResult(fileListConfig, file, increment, eslint))
  const results = await Promise.all([...getFilesResults])

  return results
}