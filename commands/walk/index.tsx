import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TaskList, Task } from 'ink-task-list';

import { useValidatedConfig } from '../../lib/config';
import buildWalkReport from '../../lib/reporters/buildWalkReport';
import getTagListFromConfig from '../../lib/config/getTagListFromConfig';
import { useGitUtils, WalkIteratorResult } from '../../lib/git';

import { getCommitResult, formatWalkResults, WalkLoopResult } from './getCommitResult';

import type { RevisionResults } from '../../lib/types'

function Walk({
  config,
  include = null,
}) {
  const [results, setResults] = useState({});
  const [currentCommit, setCurrentCommit] = useState({ commit: '', index: 0 });
  const [isReady, setIsReady] = useState(false);
  const [tags, setTags] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const {
    isConfigValid,
    sanitizedConfig,
    userConfig,
  } = useValidatedConfig(config);  
  
  const { isGitReady, walkCommits, checkoutTo, currentBranch, revList } = useGitUtils(sanitizedConfig);

  const revlength = isConfigValid && sanitizedConfig?.walkConfig?.limit ? sanitizedConfig.walkConfig.limit : '?'

  useEffect(() => {
    (async () => {
      if (isConfigValid && isGitReady) {
        setTags(getTagListFromConfig(sanitizedConfig));
        
        
        const walkResults = await walkCommits<RevisionResults, WalkLoopResult>(revList.reverse(), {
          onCommitChange: async ({ rev, index, previousResult }) => {
            setCurrentCommit({ commit: rev.name, index: index + 1 })
            
            const result = await getCommitResult(
              previousResult?.results,
              previousResult?.rev?.hash,
              sanitizedConfig,
              include
            );
            
            return result
          },
          onError: (error) => {
            console.log(error);
          },
          onEnd: async (results: WalkIteratorResult<WalkLoopResult>[]): Promise<RevisionResults[]> => {
            const result = formatWalkResults(sanitizedConfig, results);
            await checkoutTo(currentBranch);
            return result;
          },
        });
        setResults(walkResults);
        setIsReady(true);
      }
    })();
  }, [isConfigValid, isGitReady]);

  useEffect(() => {
    (async () => {
      if (isReady) {
        buildWalkReport(userConfig, tags, results);
        setIsFinished(true);
      }
    })();
  }, [isReady]);

  return (
    <TaskList>
      <Task
          state={isConfigValid === null ? 'loading' : isConfigValid ? 'success' : 'error'}
          label="validating configuration"
          status={isConfigValid === null ? 'checking configuration' : isConfigValid ? 'success' : 'error'}
        />
      <Task
        state={!isReady ? 'loading' : 'success'}
        label={`checking the last ${revlength} commits`}
        status={`checking commit ${currentCommit.index}/${revlength} : ${currentCommit.commit}`}
      />
      <Task
        state={!isReady && !isFinished ? 'pending' : isReady && !isFinished ? 'loading': 'success'}
        label="Building a report"
      />
    </TaskList>
  );
}

Walk.propTypes = {
  config: PropTypes.string,
  include: PropTypes.string,
};

Walk.shortFlags = {
  config: 'c',
  include: 'f',
};

export default Walk;
