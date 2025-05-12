import type { Config, BrokenRule, MatchRuleUtils, SanitizedFileRule } from '../types.js'
import { findJsImportFrom, countAll, findOne, findOneOf, countAllOf, findAttributesInTag } from '../rulesUtils/index.js'

const getFileRulesErrors = (
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
    config?.fileRules?.reduce((acc: Partial<BrokenRule>[], rule: SanitizedFileRule) => {
      const nbErrors = rule.matchRule({ ...utils })

      if (nbErrors > 0) {
        acc.push({
          ruleTitle: rule.title,
          ruleId: rule.id,
          occurences: nbErrors,
        })
      }
      return acc
    }, [] as Partial<BrokenRule>[]) ?? []
  )
}

export default getFileRulesErrors
