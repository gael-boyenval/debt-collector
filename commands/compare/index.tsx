import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'ink';
import { TaskList, Task } from 'ink-task-list';
import simpleGit from 'simple-git';
import getFilesList from '../../lib/getFilesList';
import checkFileList from '../../lib/checkFileList';
import { ResultsCompare } from '../../components/Reporter';
import useValidatedConfig from '../../lib/useValidatedConfig';

let currentRev;
let hasStashed = false;

const gitOptions = {
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6,
};

const git = simpleGit(gitOptions);

const checkoutTo = async (revision) => {
  currentRev = await git.revparse(['--short', 'HEAD']);
  const status = await git.status();

  const changes = status.files.length;

  if (changes > 0) {
    hasStashed = true;
    await git.stash();
  }

  await git.checkout([revision]);
};

const checkoutBackToCurrent = async () => {
  await git.checkout([currentRev]);

  if (hasStashed) {
    await git.stash(['pop']);
    hasStashed = false;
  }
};

function Compare({
  revision = null,
  rule = null,
  tags = null,
  config = null,
 	collectFrom = null,
  outputHtml = false,
}) {
  const [results, setResults] = useState(null);
  const [fileList, setFileList] = useState(null);
  const [checkedFileCount, setCheckedFileCount] = useState(0);
  const [revisionResults, setRevisionResults] = useState(null);
  const [checkedRevisionFileCount, setRevisionCheckedFileCount] = useState(0);

  const [finalResult, setFinalResult] = useState(null);

  const {
    isConfigValidated,
    updatedConfig,
  } = useValidatedConfig(config);

  useEffect(() => {
    (async () => {
      if (isConfigValidated) {
        const result = await getFilesList(updatedConfig, revision, collectFrom);
        setFileList(result);
      }
    })();
  }, [isConfigValidated]);

  useEffect(() => {
    (async () => {
      if (fileList !== null) {
        const increment = () => setCheckedFileCount((prevCount) => prevCount += 1);
        const result = await checkFileList(fileList, updatedConfig, rule, tags, increment);
        setResults(result);
      }
    })();
  }, [fileList]);

  useEffect(() => {
    (async () => {
      if (results !== null) {
        try {
          await checkoutTo(revision);
        } catch (e) {
          console.log(e);
        }
        const increment = () => setRevisionCheckedFileCount((prevCount) => prevCount += 1);
        const result = await checkFileList(fileList, updatedConfig, rule, tags, increment);
        setRevisionResults(result);
      }
    })();
  }, [results]);

  useEffect(() => {
    (async () => {
      if (revisionResults !== null) {
        try {
          await checkoutBackToCurrent();
        } catch (e) {
          console.log(err);
        }

        const finalResults = Object.assign({}, ...fileList.map((fileName) => {
          const currentScore = results.find(({ file }) => file === fileName).totalScore;
          const revisionScore = revisionResults.find(({ file }) => file === fileName).totalScore;

          const tendency = currentScore - revisionScore;

          return {
            [fileName]: {
              rev: revisionResults.find(({ file }) => file === fileName).totalScore,
              current: results.find(({ file }) => file === fileName).totalScore,
              tendency,
            },
          };
        }));

        setFinalResult(finalResults);
      }
    })();
  }, [revisionResults]);

  return (
    <>
      <TaskList>
        <Task
          state={isConfigValidated === null ? 'loading' : isConfigValidated ? 'success' : 'error'}
          label="validating configuration"
          status={isConfigValidated === null ? 'checking configuration' : isConfigValidated ? 'success' : 'error'}
        />
        <Task
          state={fileList === null ? 'loading' : 'success'}
          label="defining file to check"
          status={fileList === null ? null : `${fileList.length} files`}
        />
        <Task
          state={results === null ? 'loading' : 'success'}
          label="checking current files"
          status={`${checkedFileCount}/${fileList === null ? '?' : fileList.length} files`}
        />
        <Task
          state={finalResult === null ? 'loading' : 'success'}
          label={`checking and comparing with ${revision} files`}
          status={`${checkedRevisionFileCount}/${fileList === null ? '?' : fileList.length} files`}
        />
      </TaskList>

      {isConfigValidated === false && (
      <Text color="red">Error during config</Text>
      )}

      { finalResult !== null && <ResultsCompare results={finalResult} outputHtml={outputHtml} />}
    </>
  );
}

Compare.propTypes = {
  revision: PropTypes.string.isRequired,
 	collectFrom: PropTypes.string,
  rule: PropTypes.string,
  tags: PropTypes.array,
  config: PropTypes.string,
  htmlReport: PropTypes.bool,
};

Compare.shortFlags = {
  rule: 'r',
  tags: 't',
 	collectFrom: 'g',
  config: 'c',
};

export default Compare;
