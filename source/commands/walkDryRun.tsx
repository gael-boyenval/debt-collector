import { useEffect, useState } from 'react'
import { Text } from 'ink'
import { useValidatedConfig } from '../lib/config/index.js'
import useGitUtils from '../lib/git/useGitUtils.js'

import zod from 'zod'
import { option } from 'pastel'
import { Config, GitRevision, WalkConfig } from '../lib/types.js'


export const options = zod.object({
  config: zod.string().optional().describe(option({ description: 'an alternative path to the configuration file', alias: 'c'})),
  include: zod.string().optional().describe(option({ description: 'a glob pattern to override the include configuration', alias: 'g'})),
  openReport: zod.boolean().optional().describe(option({ description: 'open the report in the browser', alias: 'o'})),
});

export const alias = 'wdr';

type Props = {
  options: zod.infer<typeof options>
}


const WalkDryRun = ({ options }: Props) => {
  const { config } = options
  const [results, setResults] = useState<string | null>(null)
  const [parsedResult, setParsedResult] = useState<GitRevision[] | null>(null)

  const { isConfigValid, sanitizedConfig } = useValidatedConfig(config)

  const {
    execWalkCommand
  } = useGitUtils(sanitizedConfig as Config)


  useEffect(() => {
    if (
      isConfigValid &&
      !!sanitizedConfig?.walkConfig
    ) {
      ;(async () => {
        const { gitCommand, parser, limit } = sanitizedConfig.walkConfig as WalkConfig
        const result = await execWalkCommand(gitCommand)

        if (!result) {
          setResults('Error while executing the command')
          return
        }

        const parsedResults = parser(result)
        const limitedParsedResults = parsedResults.slice(0, limit || 10)

        setResults(`${result.substring(0, 2000)}...`)
        setParsedResult(limitedParsedResults)
      })()
    }
  }, [isConfigValid])

  return (
    <>
      <Text />
      <Text bold backgroundColor="red">
        Truncated result of the command :{' '}
      </Text>
      <Text>{results}</Text>
      <Text />
      <Text bold backgroundColor="red">
        Result of the parser with limit :{' '}
      </Text>
      <Text>{JSON.stringify(parsedResult, null, 2)}</Text>
    </>
  )
}

export default WalkDryRun
