import type { CheckResults, Config } from '../../lib/types.js'

export interface ResultsProps {
  results: CheckResults
  limitTop?: number
}

export interface ResultsNoMatchRuleProps {
  results: CheckResults
  initialConfig: Config | null
}
