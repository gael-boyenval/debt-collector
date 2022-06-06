import fs from 'fs'
import path from 'path'
import getFilesList from '../../lib/filters/getFilesList'
import checkFileList from '../../lib/results/checkFileList'
import type {
  Config,
  FileResults,
  RevisionResults,
  GitRevision,
  BrokenRule,
} from '../../lib/types'

export const formatWalkResults = (
  config: Config,
  results: { rev: GitRevision; results: { [filePath: string]: FileResults } }[]
): RevisionResults[] => {
  const { fileRules = [], eslintRules = [] } = config

  const allRulesIdInConfig = [
    ...fileRules.map((rule) => rule),
    ...eslintRules.map((rule) => rule),
  ]

  const revisionResultsArr = results.map(({ rev, results: filesResults }) => {
    let totalScore = 0

    const rulesScores: { [ruleId: string]: BrokenRule } =
      allRulesIdInConfig.reduce((acc, rule) => {
        acc[rule.id] = {
          ruleId: rule.id,
          ruleTitle: rule.title,
          debtScore: rule.debtScore,
          ruleTotalSore: 0,
          occurences: 0,
        }
        return acc
      }, {})

    Object.keys(filesResults).forEach((filePath) => {
      const fileResults = filesResults[filePath]

      fileResults.brokenRules.forEach((brokenRule) => {
        const { ruleId, occurences, ruleTotalSore } = brokenRule

        rulesScores[ruleId].occurences += occurences
        rulesScores[ruleId].ruleTotalSore += ruleTotalSore
        totalScore += ruleTotalSore
      })
    })

    const brokenRules = Object.values(rulesScores)

    return {
      ...rev,
      totalScore,
      brokenRules,
    }
  })

  return revisionResultsArr
}

export type WalkLoopResult = { [filePath: string]: FileResults }

export const getCommitResult = async (
  previousResult: WalkLoopResult | null,
  previousHash: string | null,
  sanitizedConfig: Config,
  include: string
): Promise<{ [filePath: string]: FileResults }> => {
  // get changed files
  const fileList = await getFilesList(sanitizedConfig, previousHash, include)

  // test changed files
  const fileResults = await checkFileList(
    fileList,
    sanitizedConfig,
    null,
    null,
    () => null
  )

  // create an object of file results
  let mergedResults = fileResults.reduce((acc, res) => {
    acc[res.filePath] = res
    return acc
  }, {})

  if (previousResult) {
    // merging previous results with the new ones
    mergedResults = {
      ...previousResult,
      ...mergedResults,
    }

    // testing for deleted, moved or rennamed files, and removing them from the results
    mergedResults = Object.keys(mergedResults).reduce((acc, filePath) => {
      const fileStillExist = fs.existsSync(
        path.resolve(process.cwd(), `./${filePath}`)
      )

      if (fileStillExist) {
        acc[filePath] = mergedResults[filePath]
      }

      return acc
    }, {})
  }

  return mergedResults
}
