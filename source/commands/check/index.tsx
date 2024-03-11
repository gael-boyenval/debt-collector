/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Text, Box } from 'ink'
import { TaskList, Task } from 'ink-task-list'
import getFilesList from '../../lib/filters/getFilesList'
import checkFileList from '../../lib/results/checkFileList'
import {
  Results,
  ResultsFileOnly,
  ResultsNoMatchRule,
} from '../../components/ResultReporter'
import { useValidatedConfig } from '../../lib/config'
import { cleanTagFilterParam } from '../../lib/utils'
import { CheckResults } from '../../lib/types'

function Check({
  rule = null,
  tags = null,
  config = null,
  include = null,
  reportFormat = 'standard',
  changedSince = null,
  limitTop = null,
}) {
  // TODO fix include param => fail
  const [results, setResults] = useState<CheckResults | null>(null)
  const [fileList, setFileList] = useState<string[] | null>(null)
  const [checkedFileCount, setCheckedFileCount] = useState<number>(0)

  const { isConfigValid, sanitizedConfig, configErrors } =
    useValidatedConfig(config)

  const cleanTags = cleanTagFilterParam(tags)

  useEffect(() => {
    (async () => {
      if (isConfigValid) {
        const result = await getFilesList(
          sanitizedConfig,
          changedSince,
          include,
          false
        )
        setFileList(result)
      }
    })()
  }, [isConfigValid])

  useEffect(() => {
    (async () => {
      if (fileList !== null) {
        const incrementFn = () =>
          setCheckedFileCount((prevCount: number): number => prevCount + 1)
        const results = await checkFileList(
          fileList,
          sanitizedConfig,
          rule,
          tags,
          incrementFn
        )
        setResults({ results, config: sanitizedConfig })
      }
    })()
  }, [fileList])

  const collectingFrom = `Collecting debt from ${
    changedSince
      ? `files changed since ${changedSince}`
      : include || 'all files'
  }`
  const hasFilters = cleanTags.length || rule
  const tagFilters = cleanTags.length > 0 && ` [tags : ${cleanTags}]`
  const and = cleanTags.length > 0 && rule ? ' &' : ''
  const ruleFilter = rule ? ` [rule id : ${rule}]` : ''
  const withFilters = `With rules filters on ${tagFilters}${and}${ruleFilter}`

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
        />
        <Task
          state={fileList === null ? 'loading' : 'success'}
          label="defining files to check"
          status={fileList === null ? null : `${fileList.length} files`}
        />
        <Task
          state={results === null ? 'loading' : 'success'}
          label="checking files"
          status={`${checkedFileCount}/${
            fileList === null ? '?' : fileList.length
          } files`}
        />
      </TaskList>

      {isConfigValid === false &&
        configErrors?.length > 0 &&
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
        <ResultsNoMatchRule results={results} initialConfig={sanitizedConfig} />
      )}

      <Box marginTop={1} flexDirection="column" border>
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

Check.propTypes = {
  limitTop: PropTypes.number,
  include: PropTypes.string,
  rule: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  tags: PropTypes.array,
  config: PropTypes.string,
  changedSince: PropTypes.string,
  reportFormat: PropTypes.oneOf(['filesOnly', 'noMatchRules', 'standard']),
}

Check.shortFlags = {
  rule: 'r',
  tags: 't',
  include: 'g',
  config: 'c',
  reportFormat: 'f',
  changedSince: 's',
}

export default Check
