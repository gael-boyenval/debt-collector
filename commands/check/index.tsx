/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Text, Box } from 'ink'
import { TaskList, Task } from 'ink-task-list'
import getFilesList from '../../lib/filters/getFilesList'
import getPackagesList from '../../lib/filters/getPackagesList'
import checkFileList from '../../lib/results/checkFileList'
import checkPackagesList from '../../lib/results/checkPackagesList'
import {
  Results,
  ResultsFileOnly,
  ResultsNoMatchRule,
  ResultsPackages,
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
  packages = null,
}) {
  // TODO fix include param => fail
  const [results, setResults] = useState<CheckResults | null>(null)
  const [fileList, setFileList] = useState<string[] | null>(null)
  const [checkedFileCount, setCheckedFileCount] = useState<number>(0)
  const [checkedPackagesCount, setCheckedPackagesCount] = useState<number>(0)
  const [packagesList, setPackagesList] = useState<string[] | null>(null)

  const { isConfigValid, sanitizedConfig, configErrors } =
    useValidatedConfig(config)

  const cleanTags = cleanTagFilterParam(tags)

  useEffect(() => {
    ;(async () => {
      if (isConfigValid) {
        if (packages) {
          const result = await getPackagesList()
          setPackagesList(result)
        } else {
          const result = await getFilesList(
            sanitizedConfig,
            changedSince,
            include,
            false
          )
          setFileList(result)
        }
      }
    })()
  }, [isConfigValid])

  useEffect(() => {
    ;(async () => {
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
      } else if (packagesList !== null) {
        const incrementFn = () =>
          setCheckedPackagesCount((prevCount: number): number => prevCount + 1)
        const results = await checkPackagesList(packagesList, incrementFn)

        setResults({ results, config: sanitizedConfig })
      }
    })()
  }, [fileList, packagesList])

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

  return packages ? (
    <>
      <TaskList>
        <Task
          state={results === null ? 'loading' : 'success'}
          label="checking packages"
          status={`${checkedPackagesCount}/${
            packagesList === null ? '?' : packagesList.length
          } packages`}
        />
      </TaskList>
      {results && <ResultsPackages results={results} />}
    </>
  ) : (
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
  packages: PropTypes.string,
}

Check.shortFlags = {
  rule: 'r',
  tags: 't',
  include: 'g',
  config: 'c',
  reportFormat: 'f',
  changedSince: 's',
  packages: 'p',
}

export default Check
