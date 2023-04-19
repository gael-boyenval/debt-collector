/* CONFIG */

type MatchUtil<Res extends number> = (content: string) => Res
type BinaryMatchResponse = 0 | 1

export interface MatchRuleUtils {
  findAll: MatchUtil<number>
  findOne: MatchUtil<BinaryMatchResponse>
  oneOf: (
    utilArray: MatchUtil<BinaryMatchResponse> | MatchUtil<number>[]
  ) => BinaryMatchResponse
  content: string
}

type StringOrArray = string | string[]

export interface MatchEslintRuleUtils {
  containRuleIdMessage(str: string): number
  containMessageFromPlugin(str: string): number
  results: any[]
  content: string
}

interface RulesCommonKeys {
  title: string
  id: string
  debtScore: number
  description?: string
  howTo?: string
  include?: StringOrArray
  exclude?: StringOrArray
  tags?: StringOrArray
}

export type FileRule = RulesCommonKeys & {
  matchRule?: (utils: MatchRuleUtils) => number
}

export type EslintRule = RulesCommonKeys & {
  matchRule?: (utils: MatchEslintRuleUtils) => number
}

export type WalkConfig = {
  gitCommand: string
  parser: (gitResult: string) => string[]
  limit?: number
  report?: {
    packages?: {
      [name: string]: string
    }
  }
}

export interface UserConfig {
  include: StringOrArray
  exclude: StringOrArray
  walkConfig?: WalkConfig
  fileRules?: FileRule[]
  eslintConfigPath?: string
  eslintRules?: EslintRule[]
  eslintConfig?: { [key: string]: unknown }
}

export interface Config {
  include: string[]
  exclude: string[]
  walkConfig?: WalkConfig
  fileRules?: SanitizedFileRule[]
  eslintConfigPath?: string
  eslintRules?: SanitizedEslintRule[]
  eslintConfig?: { [key: string]: unknown }
}

interface SanitizedRulesCommonKeys {
  title: string
  id: string
  debtScore: number
  description?: string
  howTo?: string
  include: string[]
  exclude?: string[]
  tags?: string[]
}

export type SanitizedFileRule = SanitizedRulesCommonKeys & {
  matchRule: (utils: MatchRuleUtils) => number
}

export type SanitizedEslintRule = SanitizedRulesCommonKeys & {
  matchRule: (utils: MatchEslintRuleUtils) => number
}

/* RESULTS */

type FilePath = string

export type BrokenRule = {
  ruleTitle: string
  ruleId: string
  occurences: number
  ruleTotalSore: number
  debtScore: number
}

export type FileResults = {
  filePath: string
  fileShortPath: string
  totalScore: number
  brokenRules: BrokenRule[]
}

export type PackageResult = {
  package: string
  latest: string
  isMinor: true
}

export type GitRevision = {
  hash: string
  date: string
  name: string
}

export type RevisionResults = GitRevision & {
  totalScore: number
  brokenRules: BrokenRule[]
}

export interface WalkResults {
  config: Config
  revsResults: RevisionResults[]
}

export interface CheckResults {
  config: Config
  results:
    | {
        [file: FilePath]: FileResults
      }
    | PackageResult[]
}

export interface CompareResults {
  config: Config
  previousRevResult: RevisionResults
  currentRevResult: RevisionResults
}
