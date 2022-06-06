import { EslintRule, FileRule, Config } from '../types'

const getConfigRuleById = (
  config: Config,
  id: string
): FileRule | EslintRule => {
  const fileRules = config.fileRules || []
  const eslintRules = config.eslintRules || []
  const rules = [...fileRules, ...eslintRules]
  return rules.find((rule) => rule.id === id)
}

export default getConfigRuleById
