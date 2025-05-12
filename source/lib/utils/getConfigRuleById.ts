import type { SanitizedFileRule, Config } from '../types.ts'

export const getConfigRuleById = (
  config: Config,
  id: string
): SanitizedFileRule | undefined => {
  const fileRules = config.fileRules || []
  return fileRules.find((rule: SanitizedFileRule) => rule.id === id)
}
