import type { ValidateConfigReturn } from './validateConfig'
import { useArrayForStringKeys } from '../utils'

const initialiseRules = (
  validatedConfig: ValidateConfigReturn
): ValidateConfigReturn => {
  const returnValues = validatedConfig
  const config = returnValues.sanitizedConfig

  returnValues.sanitizedConfig = useArrayForStringKeys(
    ['include', 'exclude'],
    config
  )

  const defaultFileRuleConfig = {
    include: '**/*',
    matchRule: () => 1,
  }

  const defaultEslintRuleConfig = {
    include: '**/*',
  }

  let fileRules = null

  if (config.fileRules?.length > 0) {
    fileRules = config.fileRules.map((rule) => {
      let sanitizedRule = {
        ...defaultFileRuleConfig,
        ...rule,
      }

      sanitizedRule = useArrayForStringKeys(
        ['include', 'exclude', 'tags'],
        sanitizedRule
      )

      return sanitizedRule
    })
  }

  let eslintRules = null

  if (config.eslintRules?.length > 0) {
    eslintRules = config.eslintRules.map((rule) => {
      let sanitizedRule = {
        ...defaultEslintRuleConfig,
        ...rule,
      }

      sanitizedRule = useArrayForStringKeys(
        ['include', 'exclude', 'tags'],
        sanitizedRule
      )

      return sanitizedRule
    })
  }

  if (fileRules) {
    returnValues.sanitizedConfig.fileRules = fileRules
  }

  if (eslintRules) {
    returnValues.sanitizedConfig.eslintRules = eslintRules
  }

  return returnValues
}

export default initialiseRules
