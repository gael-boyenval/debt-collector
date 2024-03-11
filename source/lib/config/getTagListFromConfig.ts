import { Config } from './types'

const getTagListFromConfig = (config: Config): { [key: string]: string[] } => {
  const allRules = config?.eslintRules
    ? [...config.fileRules, ...config.eslintRules]
    : config.fileRules

  const tagList = allRules.reduce((acc, rule) => {
    rule.tags.forEach((tag) => {
      if (!acc[tag]) {
        acc[tag] = [rule.id]
      }

      if (acc[tag] && !acc[tag].includes(rule.id)) {
        acc[tag].push(rule.id)
      }
    })

    return acc
  }, {})

  return tagList
}

export default getTagListFromConfig
