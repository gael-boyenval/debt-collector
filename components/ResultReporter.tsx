import React, { useEffect } from 'react';
import Table from 'ink-table';
import { Text, Box } from 'ink';
import fs from 'fs';

import compareHtmlReport from '../lib/reporters/compareMarkdownReport';
import { truncateString } from '../lib/utils';
import { CheckResults, FileResults } from '../lib/types';

const cachePath = `${process.cwd()}/node_modules/.cache/debt-collector`;
const resultPath = `${cachePath}/report.html`;

const formatResults = (results: FileResults[], limitTop: number ) => {
  let formatedResult = results.filter((result) => result.totalScore > 0);
  const impactedFilesNumber = formatedResult.length
  const totalDeptScore = formatedResult.reduce((acc, res) => acc + res.totalScore, 0);

  if (limitTop) {
    formatedResult = formatedResult
      .sort((a, b) => b.totalScore - a.totalScore)
      .filter((_item, index) => index < limitTop);
  }

  return {
    formatedResult,
    totalDeptScore,
    impactedFilesNumber,
  };
};

interface ResultsProps {
  results: CheckResults
  limitTop: number 
}
export const Results = ({ results, limitTop }: ResultsProps )=> {
  const {
    formatedResult,
    totalDeptScore,
    impactedFilesNumber
  } = formatResults(results.results, limitTop);

  return (
    <>
      {formatedResult.length > 0 && formatedResult.map((result) => (
        <Box key={result.fileShortPath} flexDirection="column" marginTop={1}>
          <Text bold color="red" underline>{result.fileShortPath}</Text>
          <Table data={result.brokenRules.map(
            ({ruleTitle, occurences, ruleTotalSore}) => ({
              title: ruleTitle,
              nb: occurences,
              score: ruleTotalSore
            }))}/>
          <Text bold color="red">
            Total Debt Score:{' '}
            {result.totalScore}
          </Text>
        </Box>
      ))}
      <Box marginTop={1}>
        <Text bold backgroundColor="#880000" color="white">
          {' '}
          Debt Score:{' '}
          {totalDeptScore}
          {' '}
          / Impacted files:{' '}
          {impactedFilesNumber}
        </Text>
      </Box>
    </>
  );
}

export function ResultsFileOnly({ results, limitTop }) {
  const {
    formatedResult,
    totalDeptScore,
    impactedFilesNumber
  } = formatResults(results.results, limitTop);


  let displayResults = formatedResult;

  if (limitTop) {
    displayResults = formatedResult
      .sort((a, b) => b.totalScore - a.totalScore)
      .filter((_item, index) => index < limitTop);
  }

  return (
    <>
      <Box marginTop={1} />
      {formatedResult.length > 0 && (
      <Table data={displayResults.map(({ fileShortPath, totalScore }) => ({ file: fileShortPath, score: totalScore }))} />
      )}
      <Box marginTop={1}>
        <Text bold backgroundColor="#880000" color="white">
          {' '}
          Debt Score:{' '}
          {totalDeptScore}
          {' '}
          / Impacted files:{' '}
          {impactedFilesNumber}
        </Text>
      </Box>
    </>
  );
}

const filterNoMatch = (results, initialConfig: Config) => {
  const allRules = [
    ...initialConfig.fileRules.map(({ id, title }) => ({ id, title })),
    ...initialConfig.eslintRules.map(({ id, title }) => ({ id, title })),
  ];

  const allFilesRules = [].concat.apply([], results.map((file) => file.rules.map(({ id }) => id)));
  const existingRules = Array.from(new Set([...allFilesRules]));

  const filteredRules = allRules.filter(({ id }) => !existingRules.includes(id));

  return {
    notMatchRules: filteredRules,
    rulesCount: allRules.length,
    existingRulesCount: existingRules.length,
  };
};

export function ResultsNoMatchRule({ results, initialConfig }) {
  const { notMatchRules, rulesCount } = filterNoMatch(results, initialConfig);

  return (
    <>
      <Box marginTop={1} />
      {notMatchRules.length > 0 && (
      <Table data={notMatchRules} />
      )}
      <Box marginTop={1}>
        <Text bold backgroundColor="#880000" color="white">
          Nb of rules with no match :
          {' '}
          {notMatchRules.length}
          {' '}
          /
          {rulesCount}
        </Text>
      </Box>
    </>
  );
}

export function ResultsCompare({ results, outputHtml }) {
  const tableResults = Object.keys(results).map((fileName) => {
    const result = results[fileName];
    return {
      file: truncateString(fileName, 60),
      rev: result.rev,
      current: result.current,
      trend: result.tendency,
    };
  }).filter((file) => !(file.rev === 0 && file.current === 0));

  const totalScores = tableResults.reduce((acc, res) => {
    const revScore = res.rev + acc.rev;
    const currentScore = res.current + acc.cur;

    return {
      rev: revScore,
      cur: currentScore,
      solde: currentScore - revScore,
    };
  }, {
    rev: 0,
    cur: 0,
    solde: 0,
  });

  const noChangesFiles = tableResults
    .filter((item) => item.trend === 0)
    .map((file) => ({
      ...file,
      trend: '=',
    }));

  const moreDeptFiles = tableResults
    .filter((item) => item.trend > 0)
    .map((file) => ({
      ...file,
      trend: `▲ ${file.trend}`,
    }));

  const lessDeptFiles = tableResults
    .filter((item) => item.trend < 0)
    .map((file) => ({
      ...file,
      trend: `▼ ${file.trend}`,
    }));

  const resultColor = (nb) => {
    if (nb > 0) return 'red';
    if (nb < 0) return 'green';
    return 'grey';
  };

  useEffect(() => {
    if (outputHtml) {
      setTimeout(() => {
        const html = compareHtmlReport({
          noChangesFiles,
          moreDeptFiles,
          lessDeptFiles,
          resultColor,
          totalScores,
        });

        fs.mkdir(cachePath, { recursive: true }, (err) => {
          if (err) throw err;
          fs.writeFileSync(resultPath, html);
        });
      }, 1000);
    }
  }, []);

  return (
    <>
      <Box marginTop={1} />
      {noChangesFiles.length > 0 && (
      <Box marginTop={1} flexDirection="column">
        <Text underline bold color="grey">Files with no changes in debt score</Text>
        <Table data={noChangesFiles} />
      </Box>
      )}
      {lessDeptFiles.length > 0 && (
      <Box marginTop={1} flexDirection="column">
        <Text underline bold color="green">Files with less debt</Text>
        <Table data={lessDeptFiles} />
      </Box>
      )}
      {moreDeptFiles.length > 0 && (
      <Box marginTop={1} flexDirection="column">
        <Text underline bold color="red">Files with more debt</Text>
        <Table data={moreDeptFiles} />
      </Box>
      )}
      <Box marginTop={1}>
        <Box paddingLeft={1} paddingRight={1} borderStyle="round" flexDirection="column">
          <Text>
            REVISION :
            {' '}
            <Text>{totalScores.rev.toString()}</Text>
          </Text>
        </Box>
        <Box paddingLeft={1} paddingRight={1} borderStyle="round" flexDirection="column">
          <Text>
            CURRENT :
            {' '}
            <Text>{totalScores.cur.toString()}</Text>
          </Text>

        </Box>
        <Box paddingLeft={1} paddingRight={1} borderStyle="round" flexDirection="column">
          <Text bold color={resultColor(totalScores.solde)} dimmed>
            DIFF :
            {' '}
            {totalScores.solde.toString()}
          </Text>
        </Box>
      </Box>
    </>
  );
}
