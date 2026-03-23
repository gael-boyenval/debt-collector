import type { Config, BrokenRule, MatchRuleUtils, SanitizedFileRule } from '../types.js'

const getFileRulesErrors = (
  config: Config,
  utils: MatchRuleUtils
): Partial<BrokenRule>[] =>
  config?.fileRules?.reduce((acc: Partial<BrokenRule>[], rule: SanitizedFileRule) => {
    const nbErrors = rule.matchRule({ ...utils })
    if (nbErrors > 0) {
      acc.push({ ruleTitle: rule.title, ruleId: rule.id, occurences: nbErrors })
    }
    return acc
  }, []) ?? []

export default getFileRulesErrors
