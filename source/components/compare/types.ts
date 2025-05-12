import { CheckResults, BrokenRule } from '../../lib/types.js'

export type FileResult = {
  previousRevResult: {
    totalScore: number
    brokenRules: BrokenRule[]
  }
  currentRevResult: {
    totalScore: number
    brokenRules: BrokenRule[]
  }
  tendency: number
}

export interface ResultsCompareProps {
  results: Record<string, FileResult>[]
  currentResults: CheckResults
  outputHtml: boolean
}
