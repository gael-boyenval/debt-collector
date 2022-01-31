const defaultFileRuleConfig = {
  matchGlob: "**/*",
  matchRule: () => 1,
};

const defaultEslintRuleConfig = {
  matchGlob: "**/*",
};

const validateConfig = async (configPath: string) => {
  let config;
  
  try {
    config = await import(`${process.cwd()}/${configPath}`);    
  } catch (e) {     
    return {
      isConfigValid: false,
      verifiedConfig: config,
    };
  }

  const returnValues = {
    isConfigValid: true,
    verifiedConfig: config.default,
  };

  const hasCollectFromKey = !!config.collectFrom;
  const hasFileRules = !!config.fileRules;
  const hasEslintRules = !!config.eslintRules;
  const hasEslintConfigPath = !!config.eslintConfigPath;
  const hasSomeRules = hasFileRules || hasEslintRules;
  const hasEslintRulesAndPathToConfig = hasEslintRules && hasEslintConfigPath;

  if (!hasCollectFromKey || !hasSomeRules || !hasEslintRulesAndPathToConfig) {
    returnValues.isConfigValid = false;
  }

  const fileRules = config.fileRules.map((rule) => ({
    ...defaultFileRuleConfig,
    ...rule,
  }));

  const eslintRules = config.eslintRules.map((rule) => ({
    ...defaultEslintRuleConfig,
    ...rule,
  }));

  return {
    ...returnValues,
    verifiedConfig: {
      ...config,
      eslintRules,
      fileRules,
    },
  };
};

export default validateConfig;
