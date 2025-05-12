import { Text } from 'ink'
import zod from 'zod'
import { TaskList, Task } from 'ink-task-list'
import spinners from 'cli-spinners'
import { ResultsCompare, useCompareState } from '../components/compare/index.js'
import { option } from 'pastel'

export const options = zod.object({
	rule: zod.string().optional().describe(option({ description: 'rule id', alias: 'r'})),
	tags: zod.string().array().optional().describe(option({ description: 'a list of tags', alias: 't'})),
	config: zod.string().optional().describe(option({ description: 'an alternative path to the configuration file', alias: 'c'})),
  include: zod.string().optional().describe(option({ description: 'a glob pattern to override the include configuration', alias: 'g'})),
  htmlReport: zod.boolean().default(false).describe(option({ description: 'build an html report'})),
  commonAncestor: zod.boolean().default(true).describe(option({ description: 'commonAncestor'})),
  revision: zod.string().optional().describe(option({ description: 'revision'})),
});

type Props = {
	options: zod.infer<typeof options>;
};

export const alias = 'co';

function Compare({
  options
}: Props) {
  const {
    revision,
    rule,
    tags,
    config,
    include,
    htmlReport,
    commonAncestor,
  } = options

  const {
    results,
    fileList,
    checkedFileCount,
    checkedRevisionFileCount,
    finalResult,
    isConfigValid,
    sanitizedConfig,
  } = useCompareState({
    revision,
    rule,
    tags,
    config,
    include,
    commonAncestor,
  })

  return (
    <>
      <TaskList>
        <Task
          state={
            isConfigValid === null
              ? 'loading'
              : isConfigValid
              ? 'success'
              : 'error'
          }
          label="validating configuration"
          status={
            isConfigValid === null
              ? 'checking configuration'
              : isConfigValid
              ? 'success'
              : 'error'
          }
          spinner={spinners.dots}
        />
        <Task
          state={fileList === null ? 'loading' : 'success'}
          label="defining file to check"
          status={fileList === null ? undefined : `${fileList.length} files`}
          spinner={spinners.dots}
        />
        <Task
          state={results === null ? 'loading' : 'success'}
          label="checking current files"
          status={`${checkedFileCount}/${
            fileList === null ? '?' : fileList.length
          } files`}
          spinner={spinners.dots}
        />
        <Task
          state={finalResult === null ? 'loading' : 'success'}
          label={`checking and comparing with ${revision} files`}
          status={`${checkedRevisionFileCount}/${
            fileList === null ? '?' : fileList.length
          } files`}
          spinner={spinners.dots}
        />
      </TaskList>

      {isConfigValid === false && <Text color="red">Error during config</Text>}

      {finalResult !== null && sanitizedConfig && (
        <ResultsCompare
          results={finalResult}
          currentResults={{ results: results ?? [], config: sanitizedConfig }}
          outputHtml={htmlReport}
        />
      )}
    </>
  )
}

export default Compare
