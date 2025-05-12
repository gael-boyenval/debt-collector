import { FileResults } from '../types.js'

export const formatResults = (results: FileResults[], limitTop?: number) => {
  let formatedResult = results.filter((result) => result.totalScore > 0)

  if (limitTop) {
    formatedResult = formatedResult
      .sort((a, b) => b.totalScore - a.totalScore)
      .filter((_item, index) => index < limitTop)
  } else {
    formatedResult = formatedResult.sort((a, b) => b.totalScore - a.totalScore)
  }

  const impactedFilesNumber = formatedResult.length
  const totalDeptScore = formatedResult.reduce(
    (acc, res) => acc + res.totalScore,
    0
  )

  return {
    formatedResult,
    totalDeptScore,
    impactedFilesNumber,
  }
}
