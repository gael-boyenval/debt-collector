import { useArrayForStringKeys } from '../utils/index.js'
import type { UserConfig, Config, SanitizedFileRule } from '../types.js'

export const sanitizeConfig = (userConfig: UserConfig): Config => {
  let sanitizedConfig = userConfig

  sanitizedConfig = useArrayForStringKeys(
    ['include', 'exclude'],
    sanitizedConfig
  )

  const defaultFileRuleConfig = {
    include: '**/*',
    matchRule: () => 1,
  }

  let fileRules: SanitizedFileRule[] | null = null

  if (sanitizedConfig.fileRules && sanitizedConfig.fileRules.length > 0) {
    fileRules = sanitizedConfig.fileRules.map((rule) => {
      let sanitizedRule = {
        ...defaultFileRuleConfig,
        ...rule,
      }

      sanitizedRule = useArrayForStringKeys(
        ['include', 'exclude', 'tags'],
        sanitizedRule
      )

      return sanitizedRule
    }) as SanitizedFileRule[]
  }

  if (fileRules) {
    sanitizedConfig.fileRules = fileRules as SanitizedFileRule[]
  }

  return sanitizedConfig as Config
}
