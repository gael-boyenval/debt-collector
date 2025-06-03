import { minimatch } from 'minimatch'

import type {
  Config,
  RevisionResults,
  WalkResults,
  BrokenRule,
  WalkLoopResult,
} from '../../lib/types.js'

export const formatWalkResults = ({
  config,
  results,
  globFilter,
  hasPackagesConfig,
}: {
  config: Config
  results: WalkResults
  globFilter: string | string[]
  hasPackagesConfig: boolean
}): RevisionResults[] => {
  const { fileRules = [] } = config
  const allRulesIdInConfig = fileRules.map((rule) => rule)

  const revisionResultsArr = results.map(({ rev, results: filesResults }) => {
    let filteredResults = filesResults

    if (hasPackagesConfig) {
      const fileNames = Object.keys(filesResults)
      filteredResults = fileNames
        .filter((filePath) =>
          typeof globFilter === 'string'
            ? minimatch(filePath, globFilter.replace(/^\.\//, ''))
            : globFilter.some((pattern) =>
                minimatch(filePath, pattern.replace(/^\.\//, ''))
              )
        )
        .reduce<WalkLoopResult>((acc, filePath) => {
          if (filePath in filesResults && !!filesResults[filePath]) {
            acc[filePath] = filesResults[filePath]
          }
          return acc
        }, {})
    }

    let totalScore = 0

    const rulesScores = allRulesIdInConfig.reduce<{
      [key: string]: BrokenRule
    }>((acc, rule) => {
      acc[rule.id] = {
        ruleId: rule.id,
        ruleTitle: rule.title,
        debtScore: rule.debtScore,
        ruleTotalSore: 0,
        occurences: 0,
      }
      return acc
    }, {})

    Object.keys(filteredResults).forEach((filePath) => {
      const fileResults = filteredResults[filePath]

      // console.log('formatWalkResults fileResults', fileResults)

      if (fileResults?.brokenRules && fileResults.brokenRules.length > 0) {
        // console.log(
        //   'formatWalkResults fileResults.brokenRules',
        //   fileResults.brokenRules
        // )
        fileResults.brokenRules.forEach((brokenRule) => {
          const { ruleId, occurences, ruleTotalSore } = brokenRule

          if (rulesScores[ruleId]) {
            rulesScores[ruleId].occurences += occurences
            rulesScores[ruleId].ruleTotalSore += ruleTotalSore
          }
        })
      }
      totalScore += fileResults?.totalScore ?? 0
    })

    const brokenRules = Object.values(rulesScores)
    // console.log('formatWalkResults brokenRules', brokenRules)

    return {
      ...rev,
      totalScore,
      brokenRules,
    }
  })

  // console.log('formatWalkResults revisionResultsArr', revisionResultsArr)

  return revisionResultsArr
}
