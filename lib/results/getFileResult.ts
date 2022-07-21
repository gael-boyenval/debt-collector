import fs from 'fs'
import { ESLint } from 'eslint'
import { getRulesForFile } from '../filters/filterRules'
import type { FileResults, BrokenRule, Config } from '../types'
import getfileRulesErrors from './getFileRulesErrors'
import getEslintRulesErrors from './getEslintRulesErrors'
import { truncateString, getConfigRuleById } from '../utils'

const updateResults = (
  config: Config,
  brokenRules: BrokenRule[],
  fileResults,
  ruleName
) => {
  const updatedFileResults = {
    ...fileResults,
  }

  if (brokenRules.length > 0) {
    brokenRules.forEach(({ ruleId, occurences }) => {
      const rule = getConfigRuleById(config, ruleId)
      const ruleTotalSore = rule.debtScore * occurences

      updatedFileResults.brokenRules.push({
        ruleTitle: rule.title,
        ruleId,
        occurences,
        ruleTotalSore,
      })

      updatedFileResults.totalScore += ruleTotalSore
    })
  }
  return updatedFileResults
}

const runFileChecks = async (
  config: Config,
  filePath: string,
  eslint: ESLint | null
): Promise<FileResults> => {
  let fileResults: FileResults = {
    filePath,
    fileShortPath: truncateString(filePath, 80),
    brokenRules: [],
    totalScore: 0,
  }

  if (config.eslintRules?.length === 0 && config.fileRules?.length === 0) {
    return fileResults
  }

  let data = ''

  try {
    data = fs.readFileSync(filePath).toString()
  } catch (error) {
    // console.error(`error while reading file ${filePath} \n ${error.message}`)
    data = ''
  }

  if (config.fileRules?.length > 0) {
    if (data) {
      const fileRulesResults = getfileRulesErrors(config, filePath, data)
      fileResults = updateResults(
        config,
        fileRulesResults,
        fileResults,
        'fileRules'
      )
    } else {
      fileResults = updateResults(config, [], fileResults, 'fileRules')
    }
  }

  if (config.eslintRules?.length > 0 && eslint) {
    if (data) {
      const eslintResults = await getEslintRulesErrors(
        config,
        filePath,
        data,
        eslint
      )

      fileResults = updateResults(
        config,
        eslintResults,
        fileResults,
        'eslintRules'
      )
    } else {
      fileResults = updateResults(config, [], fileResults, 'eslintRules')
    }
  }

  return fileResults
}

const getFileResult = async (
  config: Config,
  file: string,
  incrementCounter: () => void,
  eslint: ESLint | null
): Promise<FileResults> => {
  const rulesForFile = getRulesForFile(config, file)
  const fileResult = await runFileChecks(
    {
      ...config,
      ...rulesForFile,
    },
    file,
    eslint
  )

  incrementCounter()

  return fileResult
}

export default getFileResult
