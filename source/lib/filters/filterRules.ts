import { minimatch } from 'minimatch'
import type { SanitizedFileRule, Config } from '../types.js'

const doesMatchPath = (
  { include = [], exclude = [] }: SanitizedFileRule,
  file: string
): boolean => {
  if (include.length === 0 && exclude.length === 0) {
    return true
  }

  const cleanPath = (str: string) => str.replace('./', '')
  const isIncluded = include.some((glob) =>
    minimatch(cleanPath(file), cleanPath(glob))
  )

  const isExcluded = exclude.some((glob) =>
    minimatch(cleanPath(file), cleanPath(glob))
  )

  return isIncluded && !isExcluded
}

type RulesForFile = {
  fileRules?: SanitizedFileRule[]
}

export const getRulesForFile = (
  options: Config,
  filePath: string
): RulesForFile => {
  const rulesForFile: RulesForFile = {}

  if (options.fileRules) {
    rulesForFile.fileRules = options.fileRules.filter(
      (rule: SanitizedFileRule) => doesMatchPath(rule, filePath)
    )
  }

  return rulesForFile
}

const filterRulesByTagAndId = (
  rules: SanitizedFileRule[],
  ruleId: string | null,
  tags: string[] | null
) =>
  rules
    .filter((rule: SanitizedFileRule) => (ruleId ? ruleId === rule.id : true))
    .filter((rule: SanitizedFileRule) =>
      tags && tags.length > 0
        ? tags.some((tag) => rule.tags?.includes(tag))
        : true
    )

export const filtersRulesFromOptions = (
  options: Config,
  ruleId: string | null = null,
  tags: string[] | null = null
) => {
  let { fileRules } = options
  const cleanTag = tags && tags.filter((tag) => !!tag)

  if (ruleId || cleanTag?.length) {
    fileRules = filterRulesByTagAndId(
      options.fileRules ?? [],
      ruleId,
      cleanTag
    ) as SanitizedFileRule[]
  }

  return {
    fileRules,
  }
}
