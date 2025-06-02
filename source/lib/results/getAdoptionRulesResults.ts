import type {
  Config,
  BrokenRule,
  MatchRuleUtils,
  SanitizedFileRule,
} from '../types.js'
import {
  findJsImportFrom,
  countAll,
  findOne,
  findOneOf,
  countAllOf,
  findAttributesInTag,
} from '../rulesUtils/index.js'

const getAdoptionRulesResults = (
  config: Config,
  file: string,
  data: string
): Partial<BrokenRule>[] => {
  const utils: MatchRuleUtils = {
    content: data,
    file,
    countAll: countAll(data),
    findOne: findOne(data),
    findOneOf: findOneOf(data),
    countAllOf: countAllOf(data),
    findJsImportFrom: findJsImportFrom(data),
    findAttributesInTag: findAttributesInTag(data),
  }

  return (
    config?.adoptionRules?.reduce(
      (acc: Partial<BrokenRule>[], rule: SanitizedFileRule) => {
        const nbMatches = rule.matchRule({ ...utils })
        if (nbMatches > 0) {
          acc.push({
            ruleTitle: rule.title,
            ruleId: rule.id,
            occurences: nbMatches,
          })
        }
        return acc
      },
      [] as Partial<BrokenRule>[]
    ) ?? []
  )
}

export default getAdoptionRulesResults
