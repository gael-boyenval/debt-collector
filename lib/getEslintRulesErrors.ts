const getEslintRulesErrors =  async (config, file, data, eslint) => {
  let results
  try {
    results = await eslint.lintText(data, { warnIgnored: true });
  } catch (err) {
    results = []
  }
  
  const errors = results[0]?.messages
  
  const containRuleIdMessage = (ruleId) => errors?.filter(err => err.ruleId === ruleId).length ?? 0
  const containMessageFromPlugin = (ruleId) => {
    if (errors.length > 0) {
      const nonNullError = errors
        .filter(err => err !== null && err.ruleId !== null)
        .filter(err => err.ruleId.startsWith(ruleId))
      
      return nonNullError.length
    }
    
    return 0
  }

  const utils = {
    containRuleIdMessage,
    containMessageFromPlugin,
    results: results[0],
    file
  }

  return config.eslintRules.reduce((acc, rule) => {
    const nbErrors = rule.matchESLintRule({...utils})

    return nbErrors > 0 ? [
      ...acc,
      {
        resultId: rule.id,
        occurences: nbErrors
      }
    ] : acc
  }, [])
}

export default getEslintRulesErrors