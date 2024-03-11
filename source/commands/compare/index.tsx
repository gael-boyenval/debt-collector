import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'ink'
import { TaskList, Task } from 'ink-task-list'
import getFilesList from '../../lib/filters/getFilesList'
import checkFileList from '../../lib/results/checkFileList'
import { ResultsCompare } from '../../components/ResultReporter'
import useValidatedConfig from '../../lib/config/useValidatedConfig'
import { useGitUtils } from '../../lib/git'
import { FileResults } from '../../lib/types'

function Compare({
  revision = 'BRANCHING_REF',
  rule = null,
  tags = null,
  config = null,
  include = null,
  htmlReport = false,
  commonAncestor = true,
}) {
  const [results, setResults] = useState<FileResults[] | null>(null)
  const [fileList, setFileList] = useState(null)
  const [checkedFileCount, setCheckedFileCount] = useState(0)
  const [revisionResults, setRevisionResults] = useState<FileResults[] | null>(
    null
  )
  const [checkedRevisionFileCount, setRevisionCheckedFileCount] = useState(0)

  const [finalResult, setFinalResult] = useState(null)

  const { isConfigValid, sanitizedConfig } = useValidatedConfig(config)

  const { isGitReady, checkoutTo, currentBranch } = useGitUtils(sanitizedConfig)

  useEffect(() => {
    ;(async () => {
      if (isConfigValid && isGitReady) {
        const fileListResult = await getFilesList(
          sanitizedConfig,
          revision,
          include,
          commonAncestor
        )
        setFileList(fileListResult)
      }
    })()
  }, [isConfigValid, isGitReady])

  useEffect(() => {
    ;(async () => {
      if (fileList !== null) {
        const incrementFn = () =>
          setCheckedFileCount((prevCount) => prevCount + 1)
        const checkResult = await checkFileList(
          fileList,
          sanitizedConfig,
          rule,
          tags,
          incrementFn
        )
        setResults(checkResult)
      }
    })()
  }, [fileList])

  useEffect(() => {
    ;(async () => {
      if (results !== null) {
        try {
          await checkoutTo(revision)
        } catch (e) {
          console.log(e)
        }
        const incrementFn = () =>
          setRevisionCheckedFileCount((prevCount) => prevCount + 1)
        const result = await checkFileList(
          fileList,
          sanitizedConfig,
          rule,
          tags,
          incrementFn
        )
        setRevisionResults(result)
      }
    })()
  }, [results])

  useEffect(() => {
    ;(async () => {
      if (revisionResults !== null) {
        try {
          await checkoutTo(currentBranch)
        } catch (e) {
          console.log(err)
        }

        const finalResults = Object.assign(
          {},
          ...fileList.map((fileName) => {
            const currentScore = results.find(
              ({ filePath }) => filePath === fileName
            ).totalScore
            const revisionScore = revisionResults.find(
              ({ filePath }) => filePath === fileName
            ).totalScore

            const tendency = currentScore - revisionScore

            return {
              [fileName]: {
                rev: revisionResults.find(
                  ({ filePath }) => filePath === fileName
                ).totalScore,
                current: results.find(({ filePath }) => filePath === fileName)
                  .totalScore,
                tendency,
              },
            }
          })
        )

        setFinalResult(finalResults)
      }
    })()
  }, [revisionResults])

  useEffect(() => {
    ;(async () => {
      if (finalResult !== null) {
        await checkoutTo(currentBranch)
      }
    })()
  }, [finalResult])

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
          label="defining file to check"
          status={fileList === null ? null : `${fileList.length} files`}
        />
        <Task
          state={results === null ? 'loading' : 'success'}
          label="checking current files"
          status={`${checkedFileCount}/${
            fileList === null ? '?' : fileList.length
          } files`}
        />
        <Task
          state={finalResult === null ? 'loading' : 'success'}
          label={`checking and comparing with ${revision} files`}
          status={`${checkedRevisionFileCount}/${
            fileList === null ? '?' : fileList.length
          } files`}
        />
      </TaskList>

      {isConfigValid === false && <Text color="red">Error during config</Text>}

      {finalResult !== null && (
        <ResultsCompare
          results={finalResult}
          currentResults={results}
          outputHtml={htmlReport}
        />
      )}
    </>
  )
}

Compare.propTypes = {
  revision: PropTypes.string.isRequired,
  include: PropTypes.string,
  rule: PropTypes.string,
  tags: PropTypes.array,
  config: PropTypes.string,
  htmlReport: PropTypes.bool,
  commonAncestor: PropTypes.bool,
}

Compare.shortFlags = {
  rule: 'r',
  tags: 't',
  include: 'g',
  config: 'c',
}

export default Compare
