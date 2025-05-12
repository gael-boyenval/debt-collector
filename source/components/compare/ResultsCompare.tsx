import { useEffect } from 'react'
import { Text, Box } from 'ink'
import fs from 'fs'
import Table from '../Table.js'
import { truncateString } from '../../lib/utils/index.js'
import compareMarkdownReport from '../../lib/reporters/compareMarkdownReport.js'
import { getResultColor } from '../../lib/utils/index.js'
import type { ResultsCompareProps } from './types.js'

const cachePath = `${process.cwd()}/node_modules/.cache/debt-collector`
const resultPath = `${cachePath}/report.html`

export function ResultsCompare({ results, currentResults, outputHtml }: ResultsCompareProps) {
  const tableResults = Object.entries(results[0] || {})
    .map(([fileName, result]) => {
      return {
        file: truncateString(fileName, 60),
        rev: result.previousRevResult.totalScore,
        current: result.currentRevResult.totalScore,
        trend: result.tendency,
      }
    })
    .filter((file) => !(file.rev === 0 && file.current === 0))

  const totalScores = tableResults.reduce(
    (acc, res) => {
      const revScore = res.rev + acc.rev
      const currentScore = res.current + acc.cur

      return {
        rev: revScore,
        cur: currentScore,
        solde: currentScore - revScore,
      }
    },
    {
      rev: 0,
      cur: 0,
      solde: 0,
    }
  )

  const noChangesFiles = tableResults
    .filter((item) => item.trend === 0)
    .map((file) => ({
      ...file,
      trend: 0,
    }))

  const moreDeptFiles = tableResults
    .filter((item) => item.trend > 0)
    .map((file) => ({
      ...file,
      trend: file.trend,
    }))

  const lessDeptFiles = tableResults
    .filter((item) => item.trend < 0)
    .map((file) => ({
      ...file,
      trend: file.trend,
    }))

  useEffect(() => {
    if (outputHtml) {
      setTimeout(() => {
        const html = compareMarkdownReport({
          config: currentResults.config,
          previousRevResult: {
            hash: 'HEAD',
            date: new Date().toISOString(),
            name: 'HEAD',
            totalScore: totalScores.rev,
          },
          currentRevResult: {
            hash: 'HEAD',
            date: new Date().toISOString(),
            name: 'HEAD',
            totalScore: totalScores.cur,
            results: currentResults.results
          },
          noChangesFiles,
          moreDeptFiles,
          lessDeptFiles
        })

        fs.mkdir(cachePath, { recursive: true }, (err) => {
          if (err) throw err
          fs.writeFileSync(resultPath, html)
        })
      }, 1000)
    }
  }, [])

  return (
    <>
      <Box marginTop={1} />
      {noChangesFiles.length > 0 && (
        <Box marginTop={1} flexDirection="column">
          <Text underline bold color="grey">
            Files with no changes in debt score
          </Text>
          <Table data={noChangesFiles.map(file => ({ ...file, trend: '=' }))} />
        </Box>
      )}
      {lessDeptFiles.length > 0 && (
        <Box marginTop={1} flexDirection="column">
          <Text underline bold color="green">
            Files with less debt
          </Text>
          <Table data={lessDeptFiles.map(file => ({ ...file, trend: `▼ ${file.trend}` }))} />
        </Box>
      )}
      {moreDeptFiles.length > 0 && (
        <Box marginTop={1} flexDirection="column">
          <Text underline bold color="red">
            Files with more debt
          </Text>
          <Table data={moreDeptFiles.map(file => ({ ...file, trend: `▲ ${file.trend}` }))} />
        </Box>
      )}

      <Box marginTop={2} borderTop={true} borderBottom={true} borderColor="green" paddingTop={1} paddingBottom={1}>
        <Text bold color="green">
            The following modified files can be improved :
        </Text>
      </Box>

      {currentResults.results.filter((result) => result.totalScore !== 0).map((result) => (
          <Box key={result.fileShortPath} flexDirection="column" marginTop={1}>
            <Text bold color="red" underline>
              {result.fileShortPath}
            </Text>
            <Table
              data={result.brokenRules.map(
                ({ ruleTitle, occurences, ruleTotalSore }) => ({
                  title: ruleTitle,
                  nb: occurences,
                  score: ruleTotalSore,
                })
              )}
            />
            <Text bold color="red">
              Total Debt Score: {result.totalScore}
            </Text>
          </Box>
        ))}


      <Box marginTop={3}>
        <Box
          paddingLeft={1}
          paddingRight={1}
          borderStyle="round"
          flexDirection="column"
        >
          <Text>
            REVISION : <Text>{totalScores.rev.toString()}</Text>
          </Text>
        </Box>
        <Box
          paddingLeft={1}
          paddingRight={1}
          borderStyle="round"
          flexDirection="column"
        >
          <Text>
            CURRENT : <Text>{totalScores.cur.toString()}</Text>
          </Text>
        </Box>
        <Box
          paddingLeft={1}
          paddingRight={1}
          borderStyle="round"
          flexDirection="column"
        >
          <Text bold color={getResultColor(totalScores.solde)}>
            DIFF : {totalScores.solde.toString()}
          </Text>
        </Box>
      </Box>
    </>
  )
} 