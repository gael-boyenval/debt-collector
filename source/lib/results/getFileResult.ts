import fs from 'fs'
import { getRulesForFile } from '../filters/filterRules.js'
import type { FileResults, BrokenRule, Config } from '../types.js'
import getfileRulesErrors from './getFileRulesErrors.js'
import { truncateString, getConfigRuleById } from '../utils/index.js'

const updateResults = (
  config: Config,
  brokenRules: Partial<BrokenRule>[],
  fileResults: FileResults
) => {
  const updatedFileResults = {
    ...fileResults,
  }

  if (brokenRules.length > 0) {
    brokenRules.forEach(({ ruleId, occurences }) => {
      if (ruleId === undefined || occurences === undefined) return
      const rule = getConfigRuleById(config, ruleId)
      const ruleTotalSore = (rule?.debtScore ?? 0) * occurences

      updatedFileResults.brokenRules.push({
        ruleTitle: rule?.title ?? '',
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
  filePath: string
): Promise<FileResults> => {
  let fileResults: FileResults = {
    filePath,
    fileShortPath: truncateString(filePath, 80),
    brokenRules: [],
    totalScore: 0,
  }

  if (config.fileRules?.length === 0) {
    return fileResults
  }

  let data = ''

  try {
    data = fs.readFileSync(filePath).toString()
  } catch (error) {
    // console.error(`error while reading file ${filePath} \n ${error.message}`)
    data = ''
  }

  if (!!config.fileRules?.length) {
    if (data) {
      const brokenRules = getfileRulesErrors(config, filePath, data)
      fileResults = updateResults(config, brokenRules, fileResults)
    } else {
      fileResults = updateResults(config, [], fileResults)
    }
  }

  return fileResults
}

const getFileResult = async (
  config: Config,
  file: string,
  incrementCounter: () => void
): Promise<FileResults> => {
  const rulesForFile = getRulesForFile(config, file)
  const fileResult = await runFileChecks(
    {
      ...config,
      ...rulesForFile,
    },
    file
  )

  incrementCounter()

  return fileResult
}

export default getFileResult
