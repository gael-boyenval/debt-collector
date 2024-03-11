import minimatch from 'minimatch'
import { SanitizedFileRule, SanitizedEslintRule, Config } from '../config'

const doesMatchPath = ({ include = ['**/*'] }, file: string): boolean =>
  include.filter((glob) =>
    minimatch(file.replace('./', ''), glob.replace('./', ''))
  ).length > 0

type RulesForFile = {
  fileRules?: SanitizedFileRule[]
  eslintRules?: SanitizedEslintRule[]
}

export const getRulesForFile = (
  options: Config,
  filePath: string
): RulesForFile => {
  const rulesForFile: RulesForFile = {}

  if (options.fileRules) {
    rulesForFile.fileRules = options.fileRules.filter((rule) =>
      doesMatchPath(rule, filePath)
    )
  }

  if (options.eslintRules) {
    rulesForFile.eslintRules = options.eslintRules.filter((rule) =>
      doesMatchPath(rule, filePath)
    )
  }

  return rulesForFile
}

const filterRulesByTagAndId = (
  rules: SanitizedFileRule[] | SanitizedEslintRule[],
  ruleId: string,
  tags: string[]
) =>
  rules
    .filter((rule: SanitizedFileRule | SanitizedEslintRule) =>
      ruleId ? ruleId === rule.id : true
    )
    .filter((rule: SanitizedFileRule | SanitizedEslintRule) =>
      tags && tags.length > 0
        ? tags.some((tag) => rule.tags.includes(tag))
        : true
    )

export const filtersRulesFromOptions = (
  options: Config,
  ruleId: string | null = null,
  tags: string[] | null = null
) => {
  let { fileRules } = options
  let { eslintRules } = options
  const cleanTag = tags && tags.filter((tag) => !!tag)

  if (ruleId || cleanTag?.length) {
    fileRules = filterRulesByTagAndId(options.fileRules ?? [], ruleId, cleanTag)
    eslintRules = filterRulesByTagAndId(
      options.eslintRules ?? [],
      ruleId,
      cleanTag
    )
  }

  return {
    fileRules,
    eslintRules,
  }
}
