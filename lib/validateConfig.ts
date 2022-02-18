import path from 'path';

const defaultFileRuleConfig = {
  matchGlob: '**/*',
  matchRule: () => 1,
};

const defaultEslintRuleConfig = {
  matchGlob: '**/*',
};

const validateConfig = async (configPath: string) => {
  let config;

  try {
    config = await import(`${process.cwd()}/${configPath}`);
  } catch (e) {
    return {
      isConfigValid: false,
      verifiedConfig: {},
      eslintConfig: null,
      configErrors: [
        `Impossible to load a valid config file at ${configPath}, create a config file or provide a path to a valid config using the "--config" flag`,
      ],
    };
  }

  const returnValues = {
    isConfigValid: true,
    verifiedConfig: config.default,
    defaultConfig: config.default,
    eslintConfig: null,
    configErrors: [],
  };

  const hasCollectFromKey = !!config.collectFrom;
  const hasFileRules = !!config.fileRules;
  const hasEslintRules = !!config.eslintRules;
  const hasEslintConfigPath = !!config.eslintConfigPath;
  const hasSomeRules = hasFileRules || hasEslintRules;
  const hasEslintRulesAndPathToConfig = hasEslintRules && hasEslintConfigPath;

  if (!hasCollectFromKey || !hasSomeRules || !hasEslintRulesAndPathToConfig) {
    returnValues.isConfigValid = false;

    if (!hasCollectFromKey) {
      returnValues.configErrors.push(
        'Provide a "collectFrom" key with a glob pattern in your configuration ex: "./**/*"',
      );
    }

    if (!hasSomeRules) {
      returnValues.configErrors.push(
        'Your config does not have any rules, please create "fileRules" or/and "eslintRules"',
      );
    }

    if (!hasEslintRulesAndPathToConfig) {
      returnValues.configErrors.push(
        'You provided "eslintRules" but no path to an eslint config file',
      );
    }
  }

  const fileRules = config.fileRules.map((rule) => ({
    ...defaultFileRuleConfig,
    ...rule,
  }));

  const eslintRules = config.eslintRules.map((rule) => ({
    ...defaultEslintRuleConfig,
    ...rule,
  }));

  // TODO : validate individual rules

  if (hasEslintConfigPath) {
    try {
      returnValues.verifiedConfig.eslintConfig = require(
        path.resolve(process.cwd(), config.default.eslintConfigPath),
      );
    } catch (e) {
      return {
        isConfigValid: false,
        verifiedConfig: {},
        eslintConfig: null,
        configErrors: [
          'Impossible to load the eslint config file',
        ],
      };
    }
  }

  return {
    ...returnValues,
    verifiedConfig: {
      ...returnValues.verifiedConfig,
      eslintRules,
      fileRules,
    },
  };
};

export default validateConfig;
