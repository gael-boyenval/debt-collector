import type { Config, BrokenRule, MatchRuleUtils, SanitizedFileRule } from '../types.js'

const getAdoptionRulesResults = (
  config: Config,
  utils: MatchRuleUtils
): Partial<BrokenRule>[] =>
  config?.adoptionRules?.reduce((acc: Partial<BrokenRule>[], rule: SanitizedFileRule) => {
    const nbMatches = rule.matchRule({ ...utils })
    if (nbMatches > 0) {
      acc.push({ ruleTitle: rule.title, ruleId: rule.id, occurences: nbMatches })
    }
    return acc
  }, []) ?? []

export default getAdoptionRulesResults
