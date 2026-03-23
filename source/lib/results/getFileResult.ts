import fs from 'node:fs'
import { getRulesForFile } from '../filters/filterRules.js'
import { createMatchRuleUtils } from '../rulesUtils/index.js'
import type { FileResults, BrokenRule, Config } from '../types.js'
import getfileRulesErrors from './getFileRulesErrors.js'
import { truncateString, getConfigRuleById } from '../utils/index.js'
import getAdoptionRulesResults from './getAdoptionRulesResults.js'

const updateResults = (
  config: Config,
  brokenRules: Partial<BrokenRule>[],
  fileResults: FileResults,
  key: 'brokenRules' | 'adoptionRules' = 'brokenRules'
) => {
  const updatedFileResults = {
    ...fileResults,
  }

  if (brokenRules.length > 0) {
    brokenRules.forEach(({ ruleId, occurences }) => {
      if (ruleId === undefined || occurences === undefined) return
      let rule
      if (key === 'adoptionRules') {
        rule = config.adoptionRules?.find((r) => r.id === ruleId)
      } else {
        rule = getConfigRuleById(config, ruleId)
      }
      const ruleTotalSore = (rule?.debtScore ?? 0) * occurences

      updatedFileResults[key].push({
        ruleTitle: rule?.title ?? '',
        ruleId,
        occurences,
        ruleTotalSore,
      })

      if (key === 'brokenRules') {
        updatedFileResults.totalScore += ruleTotalSore
      }
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
    adoptionRules: [],
    totalScore: 0,
  }

  if (
    (config.fileRules?.length ?? 0) === 0 &&
    (config.adoptionRules?.length ?? 0) === 0
  ) {
    return fileResults
  }

  let data = ''

  try {
    data = await fs.promises.readFile(filePath, 'utf-8')
  } catch {
    data = ''
  }

  if (data) {
    // Build utils once per file — all rule checks share the same pre-parsed
    // DOM tags, closures, and content string rather than rebuilding independently.
    const utils = createMatchRuleUtils(filePath, data)

    if (config.fileRules?.length) {
      fileResults = updateResults(
        config,
        getfileRulesErrors(config, utils),
        fileResults,
        'brokenRules'
      )
    }

    if (config.adoptionRules?.length) {
      fileResults = updateResults(
        config,
        getAdoptionRulesResults(config, utils),
        fileResults,
        'adoptionRules'
      )
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
