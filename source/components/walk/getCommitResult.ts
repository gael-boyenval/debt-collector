import fs from 'fs'
import path from 'path'
import { minimatch } from 'minimatch'
import { getFileList } from '../../lib/filters/getFileList.js'
import { checkFileList } from '../../lib/results/checkFileList.js'
import type {
  Config,
  FileResults,
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

export const getCommitResult = async ({
  previousResult,
  sanitizedConfig,
  include,
  previousHash,
}: {
  previousResult: WalkLoopResult | null
  sanitizedConfig: Config
  include: string[] | null
  previousHash?: string | null
}): Promise<{ [filePath: string]: FileResults }> => {
  // console.log('previousHash', previousHash)
  // console.log('include', include)

  // get changed files
  const fileList = await getFileList({
    config: sanitizedConfig as Config,
    commonAncestor: false,
    compare: previousHash ?? undefined,
    globOption: include ?? [],
  })

  // console.log('fileList', fileList)

  // test changed files
  const fileResults = await checkFileList({
    fileList,
    config: sanitizedConfig as Config,
    rule: undefined,
    tags: undefined,
    increment: () => null,
  })

  // create an object of file results
  let mergedResults = fileResults.reduce<{ [key: string]: FileResults }>(
    (acc, res) => {
      acc[res.filePath] = res
      return acc
    },
    {}
  )

  if (previousResult) {
    // merging previous results with the new ones
    mergedResults = {
      ...previousResult,
      ...mergedResults,
    }

    // testing for deleted, moved or rennamed files, and removing them from the results
    mergedResults = Object.keys(mergedResults).reduce(
      (acc, filePath) => {
        const fileStillExist = fs.existsSync(
          path.resolve(process.cwd(), `./${filePath}`)
        )
        if (fileStillExist) {
          acc[filePath] = mergedResults[filePath]!
        }

        return acc
      },
      {} as { [key: string]: FileResults }
    )
  }

  return mergedResults
}
