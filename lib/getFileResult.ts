import { getRulesForFile } from './filterRules'
import getfileRulesErrors from './getfileRulesErrors'
import getEslintRulesErrors from './getEslintRulesErrors'

const fs = require("fs");

const updateResults = (config, fileErrors, fileResults, ruleName) => {
  const updatedFileResults = {
    ...fileResults,
  };
  if (fileErrors.length > 0) {
    fileErrors.forEach(({ resultId, occurences }) => {
      const rule = config[ruleName].find(({ id }) => resultId === id);

      updatedFileResults.rules.push({
        ...rule,
        occurences,
      });

      updatedFileResults.totalScore += rule.debtScore * occurences;
    });
  }
  return updatedFileResults;
};

const runFileChecks = async (config, file, eslint) => {
  let fileResults = {
    file,
    rules: [],
    totalScore: 0,
  };

  if (config.eslintRules.length === 0 && config.fileRules.length === 0) {
    return fileResults;
  }
  
  let data

  try {
    data = fs.readFileSync(file).toString()
  } catch (error) {
    data = ''
  }

  const fileRulesResults = getfileRulesErrors(config, file, data);
  fileResults = updateResults(
    config,
    fileRulesResults,
    fileResults,
    "fileRules"
  );

  const eslintResults = await getEslintRulesErrors(config, data, eslint);

  fileResults = updateResults(
    config,
    eslintResults,
    fileResults,
    "eslintRules"
  );

  return fileResults;
};
 
const getFileResult = async (config, file, incrementCounter, eslint) => {
  const rulesForFile = getRulesForFile(config, file);
  const fileResult = await runFileChecks(
    {
      ...config,
      ...rulesForFile,
    },
    file,
    eslint
  );

  incrementCounter()

  return fileResult
}
 
export default getFileResult