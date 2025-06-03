type MatchUtil<Res extends number> = (content: MatchPattern) => Res
type BinaryMatchResponse = 0 | 1
export type MatchPattern = string | RegExp

export type Command = 'walk' | 'check' | 'compare' | 'walkdryrun'
export interface MatchRuleUtils {
  countAll: MatchUtil<number>
  findOne: MatchUtil<BinaryMatchResponse>
  findOneOf: (utilArray: MatchPattern[]) => BinaryMatchResponse
  countAllOf: (utilArray: MatchPattern[]) => number
  findJsImportFrom: (importee?: string, from?: string) => BinaryMatchResponse
  content: string
  file: string
  findAttributesInTag: (
    attributes?: string | null | (string | null | undefined)[],
    tagName?: string
  ) => 0 | 1
}

export interface MatchEslintRuleUtils {
  containRuleIdMessage(str: string): number
  containMessageFromPlugin(str: string): number
  results: any[]
  content: string
}
interface SanitizedRulesCommonKeys {
  title: string
  id: string
  debtScore: number
  description?: string
  howTo?: string
  startTrackingDate?: string
  include?: string[]
  exclude?: string[]
  tags?: string[]
}
export type SanitizedFileRule = SanitizedRulesCommonKeys & {
  matchRule: (utils: MatchRuleUtils) => number
}

export type WalkConfig = {
  gitCommand: string
  parser: Parser
  limit?: number
  report?: {
    packages?: {
      [name: string]: string
    }
  }
}
interface UserFileRuleBase {
  title: string
  id: string
  debtScore: number
  description?: string
  startTrackingDate?: string
  howTo?: string
  include?: string | string[]
  exclude?: string | string[]
  tags?: string | string[]
}

export type UserFileRule = UserFileRuleBase & {
  matchRule: (utils: MatchRuleUtils) => number
}

export type UserConfig = {
  projectName: string
  include: string[]
  exclude?: string[]
  walkConfig?: WalkConfig
  fileRules?: UserFileRule[]
  adoptionRules?: UserFileRule[]
  trackAdoptionMetrics?: {
    label: string
    id: string
    debtRules: string[]
    adoptionRules: string[]
  }[]
}

export interface Config {
  projectName: string
  include: string[]
  exclude?: string[]
  walkConfig?: WalkConfig
  fileRules?: SanitizedFileRule[]
  adoptionRules?: SanitizedFileRule[]
  trackAdoptionMetrics?: {
    label: string
    id: string
    debtRules: string[]
    adoptionRules: string[]
  }[]
}

export type BrokenRule = {
  ruleTitle: string
  ruleId: string
  occurences: number
  ruleTotalSore: number
  debtScore?: number
}

export type GitRevision = {
  hash: string
  date: string
  name: string
}

export type Parser = (result: string) => GitRevision[]

export type RevisionResults = GitRevision & {
  totalScore: number
  results?: FileResults[]
  brokenRules?: BrokenRule[]
}

export type WalkLoopResult = { [filePath: string]: FileResults }

export type WalkResults = {
  rev: GitRevision
  results: WalkLoopResult
}[]

type TagName = string
type RuleId = string
export type WalkReportTagList = Record<TagName, RuleId[]>

export type FileResults = {
  filePath: string
  fileShortPath: string
  totalScore: number
  brokenRules: BrokenRule[]
  adoptionRules: BrokenRule[]
}
export interface CheckResults {
  config: Config
  results: FileResults[]
}

export type FileComparison = {
  file: string
  rev: number
  current: number
  trend: number
}

export interface CompareResults {
  config: Config
  previousRevResult: RevisionResults
  currentRevResult: RevisionResults
  noChangesFiles: FileComparison[]
  lessDeptFiles: FileComparison[]
  moreDeptFiles: FileComparison[]
}

export type WalkReportData = {
  config: Config
  results: WalkResults
}
