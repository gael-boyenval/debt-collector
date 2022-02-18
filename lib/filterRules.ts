import minimatch from 'minimatch';

const doesMatchPath = ({ matchGlob = '**/*' }, file) => {
  if (typeof matchGlob === 'string') {
    return minimatch(
      file.replace('./', ''),
      matchGlob.replace('./', ''),
    );
  }

  if (Array.isArray(matchGlob)) {
    return matchGlob.filter((glob) => minimatch(
      file.replace('./', ''),
      glob.replace('./', ''),
    )).length > 0;
  }
};

export const getRulesForFile = (options, filePath) => {
  const fileRules = options.fileRules.filter((rule) => doesMatchPath(rule, filePath));
  const eslintRules = options.eslintRules.filter((rule) => doesMatchPath(rule, filePath));

  return {
    fileRules,
    eslintRules,
  };
};

const getRules = (rules, ruleId, tags) => rules
  .filter((rule) => (ruleId
    ? ruleId === rule.id
    : true)).filter((rule) => ((tags && tags.length > 0)
    ? tags.some((tag) => rule.tags.includes(tag))
    : true));

export const filtersRulesFromOptions = (options, ruleId = null, tags = null) => {
  let { fileRules } = options;
  let { eslintRules } = options;
  const cleanTag = tags && tags.filter((tag) => !!tag);

  if (ruleId || cleanTag?.length) {
    fileRules = getRules(options.fileRules, ruleId, cleanTag);
    eslintRules = getRules(options.eslintRules, ruleId, cleanTag);
  }

  return {
    fileRules,
    eslintRules,
  };
};
