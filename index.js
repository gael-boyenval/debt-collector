#! /usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");

const getFilesList = require("./lib/getFilesList");
const {
  getRulesForFile,
  filtersRulesFromOptions,
} = require("./lib/filterRules");
const validateConfig = require("./lib/validateConfig");
const getfileRulesErrors = require("./lib/getfileRulesErrors.js");
const getEslintRulesErrors = require("./lib/getEslintRulesErrors.js");
const eslint = new ESLint();
clear();

let totalScore = 0;
let impactedFiles = 0;

const data = {
  totalScore: 0,
  impactedFiles: 0,
  files: {},
  config: {},
};

const baseCommands = {
  "--rule": null,
  "--tags": null,
  "--config": null,
  "--eslint-config": null,
  "--compare": null,
  compare: null,
  walk: null,
  changed: null,
  file: null,
};

const commands = {
  ...baseCommands,
  compareToRev: "master",
  configPath: `${__dirname}/lib/config`,
};

const { isConfigValid, verifiedConfig } = validateConfig(commands);

if (!isConfigValid) {
  return console.log("invalid config");
}

console.log("config is valid");

const logFileScore = (fileResults) => {
  if (fileResults.rules.length) {
    console.log(
      chalk.blue(fileResults.file) + " : " + chalk.red(fileResults.totalScore)
    );
    fileResults.rules.forEach((rule) =>
      console.log(
        chalk.yellow(rule.title) +
          " / occurences: " +
          chalk.blue(rule.occurences)
      )
    );
  }
};

const run = async () => {
  const files = await getFilesList(verifiedConfig, commands);
  console.log("there is " + files.length + " files");
  const filteredRules = filtersRulesFromOptions(verifiedConfig, commands);

  const filteredConfig = {
    ...verifiedConfig,
    ...filteredRules,
  };

  for (const file of files) {
    const rulesForFile = getRulesForFile(filteredConfig, file);

    const fileResult = await runFileChecks(
      {
        ...filteredConfig,
        ...rulesForFile,
      },
      file
    );

    logFileScore(fileResult);
    totalScore += fileResult.totalScore;
    impactedFiles += fileResult.totalScore > 0 ? 1 : 0;
  }

  console.log(chalk.red(`----------------------------`));
  console.log(
    chalk.red(`SCORE TOTAL : ${totalScore} | Impacted files : ${impactedFiles}`)
  );
  console.log(chalk.red(`----------------------------`));
};

run();
