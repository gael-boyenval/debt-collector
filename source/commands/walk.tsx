import { TaskList, Task } from 'ink-task-list'
import { Text } from 'ink'
import zod from 'zod'
import { option } from 'pastel'
import spinners from 'cli-spinners'
import { LogViewer } from '../components/DevLogger/LogViewer.js'
import { useWalkState } from '../components/walk/useWalkState.js'
import { ConfigErrors } from '../components/shared/ConfigErrors.js'

export const options = zod.object({
  config: zod
    .string()
    .optional()
    .describe(
      option({
        description: 'an alternative path to the configuration file',
        alias: 'c',
      })
    ),
  // include: zod.string().optional().describe(option({ description: 'a glob pattern to override the include configuration', alias: 'g'})),
  openReport: zod
    .boolean()
    .optional()
    .describe(
      option({ description: 'open the report in the browser', alias: 'o' })
    ),
})

export const alias = 'w'

type Props = {
  options: zod.infer<typeof options>
}

const Walk = ({ options }: Props) => {
  const { config, openReport } = options

  const { logs, tasks, isHistoryDirty, isConfigValid, configErrors } =
    useWalkState({
      config,
      // include
      openReport,
    })

  return (
    <>
      <TaskList>
        {tasks.map((task) => (
          <Task
            key={task.label}
            state={task.state}
            label={task.label}
            status={task.status}
            spinner={spinners.dots}
          />
        ))}
      </TaskList>

      {isHistoryDirty && (
        <Text color="red">
          Your have uncommited changes, please commit or stash them
        </Text>
      )}

      <ConfigErrors isConfigValid={isConfigValid} configErrors={configErrors} />

      <LogViewer logs={logs} />
    </>
  )
}

export default Walk
