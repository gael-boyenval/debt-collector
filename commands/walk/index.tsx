/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TaskList, Task } from 'ink-task-list';
import { Text } from 'ink';

import { useValidatedConfig } from '../../lib/config';
import buildWalkReport from '../../lib/reporters/buildWalkReport';
import buildWalkEntries from '../../lib/reporters/buildWalkEntries';
import getTagListFromConfig from '../../lib/config/getTagListFromConfig';
import { useGitUtils, WalkIteratorResult } from '../../lib/git';

import { getCommitResult, formatWalkResults, WalkLoopResult } from './getCommitResult';

import type { RevisionResults } from '../../lib/types'
import getEndDatesEstimations from './getEndDatesEstimations';


const useTaskList = ({isConfigValid, isReady, isHistoryDirty, isFinished, revlength, currentCommit, isGitReady}) => {
  const checkGitHistoryState = (() => {
    if (!isGitReady) return 'loading'
    if (isGitReady && !isHistoryDirty) return 'success'
    if (isGitReady && isHistoryDirty) return 'error'
    return 'pending'
  })()
  
  const checkGitHistory = {
    state: checkGitHistoryState,
    label: 'check git history',
    status: checkGitHistoryState === 'loading' ? 'checking git history': checkGitHistoryState,
  }

  const configTaskState = (() => {
    if (isConfigValid === null) return 'loading'
    if (isConfigValid && !isHistoryDirty) return 'success'
    if (!isConfigValid || isHistoryDirty) return 'error'
    return 'pending'
  })()
  
  const configTask = {
    state: configTaskState,
    label: 'load and validate configuration',
    status: configTaskState === 'loading' ? 'validating configuration' : configTaskState
  }

  const walkTaskState = (() => {
    if (!isReady && configTaskState === 'success') return 'loading'
    if (isReady && !isHistoryDirty) return 'success'
    if (isHistoryDirty) return 'error'
    return 'pending'
  })()
  
  const walkTask = {
    state: walkTaskState,
    label: `checking the last ${revlength} commits`,
    status: walkTaskState === 'loading' 
      ? `checking commit ${currentCommit.index}/${revlength} : ${currentCommit.commit}`
      : walkTaskState
  }

  const reportTaskState = (() => {
    if (walkTaskState !== 'success' && walkTaskState !== 'error') return 'pending'
    if (walkTaskState === 'success' && !isFinished) return 'loading'
    if (walkTaskState === 'success' && isFinished) return 'success'
    return 'error'
  })()
  
  const reportTask = {
    state: reportTaskState,
    label: `build a report`,
    status: reportTaskState === 'loading' 
      ? `building html report`
      : walkTaskState
  }

  return [
    checkGitHistory,
    configTask,
    walkTask,
    reportTask,
  ]
}

function Walk({
  config,
  include = null,
  openReport = false
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
  
  const { isGitReady, walkCommits, checkoutTo, currentBranch, revList, isHistoryDirty } = useGitUtils(sanitizedConfig);
  const revlength = isConfigValid && sanitizedConfig?.walkConfig?.limit ? sanitizedConfig.walkConfig.limit : '?'
  const tasks = useTaskList({isConfigValid, isReady, isHistoryDirty, isFinished, revlength, currentCommit, isGitReady})

  useEffect(() => {
    (async () => {
      if (isConfigValid && isGitReady && !isHistoryDirty) {
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
          onEnd: async (results: WalkIteratorResult<WalkLoopResult>[])=> {
            await checkoutTo(currentBranch);
            return results;
          },
        });

        setResults(walkResults);
        setIsReady(true);
      }
    })();
  }, [isConfigValid, isGitReady, isHistoryDirty]);

  useEffect(() => {
    (async () => {
      if (isReady) {
        const hasPackagesConfig = isConfigValid && !!sanitizedConfig?.walkConfig?.report?.packages
        
        const reports = hasPackagesConfig 
          ? sanitizedConfig.walkConfig.report.packages
          : { global: sanitizedConfig.include }
        
        const reportsLinks = Object.keys(reports).map(
          report => ({name: report, link: `./report-${report}.html`})
        )

        Object.keys(reports).forEach(reportName => {
          const formatedResult = formatWalkResults(sanitizedConfig, results, reports[reportName], hasPackagesConfig);
          const endDateEstimations = getEndDatesEstimations({ initialConfig: userConfig, results: formatedResult })
          buildWalkReport(userConfig, tags, formatedResult, endDateEstimations, reportName, reportsLinks);
        })

        buildWalkEntries(reportsLinks, openReport)

        setIsFinished(true);
      }
    })();
  }, [isReady]);

  return (
    <>
    <TaskList>
      {tasks.map(task => (
        <Task
          key={task.label}
          state={task.state}
          label={task.label}
          status={task.status}
        />
      ))}
    </TaskList>
    {isHistoryDirty && <Text color="red">Your have uncommited changes, please commit or stash them</Text>}
    </>
  );
}

Walk.propTypes = {
  config: PropTypes.string,
  include: PropTypes.string,
  openReport: PropTypes.bool
};

Walk.shortFlags = {
  config: 'c',
  include: 'f',
};

export default Walk;
