import path from 'path'
import { Config, UserConfig } from './config'
import sanitizeConfig from './sanitizeConfig'

export type ValidateConfigReturn = {
  isConfigValid: boolean
  sanitizedConfig: Config | null
  configErrors: string[]
  userConfig: UserConfig | null
}

const validateConfig = async (configPath): Promise<ValidateConfigReturn> => {
  let config: undefined | Config

  const returnValues = {
    isConfigValid: true,
    sanitizedConfig: null,
    userConfig: null,
    configErrors: [],
  }

  try {
    const importedConfig = await import(`${process.cwd()}/${configPath}`)
    config = importedConfig.default
    returnValues.sanitizedConfig = config
    returnValues.userConfig = config
  } catch (e) {
    returnValues.isConfigValid = false
    returnValues.configErrors.push(
      `Impossible to load a valid config file at ${configPath}, create a config file or provide a path to a valid config using the "--config" flag`
    )
    return returnValues
  }

  const hasIncludeKey = !!config.include
  const hasFileRules = !!config.fileRules
  const hasEslintRules = !!config.eslintRules
  const hasEslintConfigPath = !!config.eslintConfigPath
  const hasSomeRules = hasFileRules || hasEslintRules

  if (!hasIncludeKey) {
    returnValues.isConfigValid = false
    returnValues.configErrors.push(
      'Provide a "include" key with a glob pattern in your configuration ex: "./**/*"'
    )
  }

  if (!hasSomeRules) {
    returnValues.isConfigValid = false
    returnValues.configErrors.push(
      'Your config does not have any rules, please create "fileRules" or/and "eslintRules"'
    )
  }

  if (hasEslintRules && !hasEslintConfigPath) {
    returnValues.isConfigValid = false
    returnValues.configErrors.push(
      'You provided "eslintRules" but no path to an eslint config file'
    )
  }

  if (!hasEslintRules && hasEslintConfigPath) {
    returnValues.isConfigValid = false
    returnValues.configErrors.push(
      'You provided a a path to an eslint config but no "eslintRules"'
    )
  }

  // TODO : validate individual rules
  // - unique ID
  // - include either an include key or a matchRule

  if (hasEslintConfigPath && hasEslintRules) {
    try {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      returnValues.sanitizedConfig.eslintConfig = require(path.resolve(
        process.cwd(),
        config.eslintConfigPath
      ))
    } catch (e) {
      returnValues.isConfigValid = false
      returnValues.configErrors.push(
        'Impossible to load the eslint config file'
      )
    }
  }

  return sanitizeConfig(returnValues)
}

export default validateConfig
