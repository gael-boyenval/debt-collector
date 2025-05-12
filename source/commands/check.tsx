import { Text, Box } from 'ink'
import { TaskList, Task } from 'ink-task-list';
import spinners from 'cli-spinners';
import zod from 'zod'
import { option } from 'pastel';

import {
  Results,
  ResultsFileOnly,
  ResultsNoMatchRule,
  useCheckState,
} from '../components/check/index.js'
import { useDevLogger } from '../components/hooks/useDevLogger.js'
import { LogViewer } from '../components/DevLogger/LogViewer.js';

export const options = zod.object({
	rule: zod.string().optional().describe(option({ description: 'rule id', alias: 'r'})),
	tags: zod.string().array().optional().describe(option({ description: 'a list of tags', alias: 't'})),
	config: zod.string().optional().describe(option({ description: 'an alternative path to the configuration file', alias: 'c'})),
  include: zod.string().optional().describe(option({ description: 'a glob pattern to override the include configuration', alias: 'g'})),
  reportFormat: zod.enum(['filesOnly', 'noMatchRules', 'standard']).default('standard').optional().describe(option({ description: 'report format', alias: 'f'})),
  changedSince: zod.string().optional().describe(option({ description: 'a revision to filter files changed since (commit hash or branch name)', alias: 's'})),
  limitTop: zod.number().optional().describe(option({ description: 'limit the number of results ordered by score', alias: 'l'})),
});
export const alias = 'c';

type Props = {
	options: zod.infer<typeof options>;
};

function Check({options}: Props) {
  const {
    rule,
    tags,
    config,
    include,
    reportFormat,
    changedSince,
    limitTop,
  } = options

  const logger = useDevLogger();
  const {
    results,
    fileList,
    checkedFileCount,
    isConfigValid,
    configErrors,
    collectingFrom,
    hasFilters,
    withFilters,
  } = useCheckState({
    rule,
    tags,
    config,
    include,
    changedSince,
  })

  return (
    <>
      <LogViewer logs={logger.logs} />
      <TaskList>
        <Task
          state={
            isConfigValid === null
              ? 'loading'
              : isConfigValid
              ? 'success'
              : 'error'
          }
          spinner={spinners.dots}
          label="validating configuration"
          status={
            isConfigValid === null
              ? 'checking configuration'
              : isConfigValid
              ? 'success'
              : 'error'
          }
        />
        <Task
          state={fileList === null ? 'loading' : 'success'}
          spinner={spinners.dots}
          label="defining files to check"
          status={fileList === null ? undefined : `${fileList.length} files`}
        />
        <Task
          state={results === null ? 'loading' : 'success'}
          spinner={spinners.dots}
          label="checking files"
          status={`${checkedFileCount}/${
            fileList === null ? '?' : fileList.length
          } files`}
        />
      </TaskList>

      {isConfigValid === false &&
        configErrors &&
        configErrors.length > 0 &&
        configErrors.map((error: any, i: any) => (
          <Text key={i} color="red">
            {error}
          </Text>
        ))}

      {results !== null && reportFormat === 'standard' && (
        <Results results={results} limitTop={limitTop} />
      )}
      {results !== null && reportFormat === 'filesOnly' && (
        <ResultsFileOnly results={results} limitTop={limitTop} />
      )}
      {results !== null && reportFormat === 'noMatchRules' && (
        <ResultsNoMatchRule results={results} initialConfig={results.config} />
      )}

      <Box marginTop={1} flexDirection="column">
        <Text color="grey">{collectingFrom}</Text>
        {hasFilters && <Text color="grey">{withFilters}</Text>}
        <Text color="grey">
          Reporting :{reportFormat}{' '}
          {limitTop && `• top ${limitTop} biggest score`}
        </Text>
      </Box>
    </>
  )
}

export default Check
