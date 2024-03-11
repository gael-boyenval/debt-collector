import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Text } from 'ink'
import { useValidatedConfig } from '../../lib/config'
import { execWalkCommand, getRevList } from '../../lib/git/gitUtils'

function Walk({ revlength = 10, config, include = null }) {
  const [results, setResults] = useState(null)
  const [parsedResult, setParsedResult] = useState(null)
  const [currentCommit, setCurrentCommit] = useState({ commit: '', index: 0 })
  const [isReady, setIsReady] = useState(false)
  const [tags, setTags] = useState({})

  const { isConfigValid, sanitizedConfig, configErrors, userConfig } =
    useValidatedConfig(config)

  useEffect(() => {
    if (
      isConfigValid &&
      sanitizedConfig?.walkConfig?.gitCommand &&
      sanitizedConfig?.walkConfig?.parser &&
      sanitizedConfig?.walkConfig?.limit
    ) {
      ;(async () => {
        const { gitCommand, parser, limit } = sanitizedConfig.walkConfig
        const result = await execWalkCommand(gitCommand)
        const parsedResults = parser(result)
        const limitedParsedResults = parsedResults.slice(
          0,
          sanitizedConfig.walkConfig.limit
        )

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

Walk.propTypes = {
  revlength: PropTypes.number,
  config: PropTypes.string,
  include: PropTypes.string,
}

Walk.shortFlags = {
  revlength: 'n',
  config: 'c',
  include: 'f',
}

export default Walk
