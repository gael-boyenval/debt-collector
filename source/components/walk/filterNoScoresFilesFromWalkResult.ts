import { WalkLoopResult, WalkReportData } from '../../lib/types.js'

const filterFilesWithLMatchingRules = (
  walkLoopResult: WalkLoopResult
): WalkLoopResult =>
  Object.fromEntries(
    Object.entries(walkLoopResult).filter(
      (entries) =>
        entries[1].brokenRules.length > 0 || entries[1].adoptionRules.length > 0
    )
  )

export const filterNoScoresFilesFromWalkResult = (
  data: WalkReportData
): WalkReportData => ({
  config: data.config,
  results: data.results.map((commit) => ({
    ...commit,
    results: filterFilesWithLMatchingRules(commit.results),
  })),
})
