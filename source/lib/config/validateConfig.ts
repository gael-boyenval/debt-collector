import type { Config, UserConfig } from '../types.js'
import { loadConfig } from './loadConfig.js'
import { sanitizeConfig } from './sanitizeConfig.js'

export type ValidateConfigReturn = {
  isConfigValid: boolean
  sanitizedConfig: Config
  configErrors: string[]
  userConfig: UserConfig
}

const validateConfig = async (
  configPath: string
): Promise<ValidateConfigReturn> => {
  let userConfig: UserConfig

  const returnValues: ValidateConfigReturn = {
    isConfigValid: true,
    sanitizedConfig: { include: [], exclude: [], fileRules: [] },
    userConfig: { include: [], fileRules: [] },
    configErrors: [],
  }

  const { isSuccess, config, error } = await loadConfig(configPath)

  if (!isSuccess) {
    returnValues.isConfigValid = false
    returnValues.configErrors.push(error)
    return returnValues
  }

  userConfig = config

  const hasIncludeKey = !!userConfig?.include
  const hasFileRules = !!userConfig?.fileRules

  if (!hasIncludeKey) {
    returnValues.isConfigValid = false
    returnValues.configErrors.push(
      'Provide a "include" key with a glob pattern in your configuration ex: include: ["./**/*"]'
    )
  } else if (
    !Array.isArray(userConfig.include) ||
    userConfig.include.length === 0
  ) {
    returnValues.isConfigValid = false
    returnValues.configErrors.push(
      'The "include" key must be an array containing at least one glob pattern'
    )
  }

  if (!hasFileRules) {
    returnValues.isConfigValid = false
    returnValues.configErrors.push(
      'Your config does not have any rules, please create "fileRules" key'
    )
  }

  if (userConfig.walkConfig) {
    if (
      !userConfig.walkConfig.gitCommand ||
      typeof userConfig.walkConfig.gitCommand !== 'string'
    ) {
      returnValues.isConfigValid = false
      returnValues.configErrors.push(
        'Your config does not have a "gitCommand" key, please create "walkConfig" key with "gitCommand" key'
      )
    }

    if (
      !userConfig.walkConfig.parser ||
      typeof userConfig.walkConfig.parser !== 'function'
    ) {
      returnValues.isConfigValid = false
      returnValues.configErrors.push(
        'Your config does not have a "parser" key, please create "walkConfig" key with "parser" key'
      )
    }
  }
  // Validate individual rules
  const fileRules = userConfig.fileRules
  if (fileRules && fileRules.length > 0) {
    const ruleIds = new Set<string>()

    fileRules.forEach((rule, index) => {
      // Check for unique IDs
      if (ruleIds.has(rule.id)) {
        returnValues.isConfigValid = false
        returnValues.configErrors.push(
          `Duplicate rule ID "${rule.id}" found at index ${index}. Each rule must have a unique ID.`
        )
      }
      ruleIds.add(rule.id)

      // Check for required fields
      if (!rule.include && !rule.matchRule) {
        returnValues.isConfigValid = false
        returnValues.configErrors.push(
          `Rule "${rule.id}" at index ${index} must have either an "include" pattern or a "matchRule" function.`
        )
      }

      // Check include array if present
      if (
        rule.include &&
        (!Array.isArray(rule.include) || rule.include.length === 0)
      ) {
        returnValues.isConfigValid = false
        returnValues.configErrors.push(
          `Rule "${rule.id}" at index ${index} must have an "include" array containing at least one glob pattern`
        )
      }
    })
    const sanitizedConfig = sanitizeConfig(userConfig)
    returnValues.sanitizedConfig = sanitizedConfig
  }

  return returnValues
}

export default validateConfig
