import { Text, Box } from 'ink'
import Table from '../Table.js'
import { formatResults } from '../../lib/utils/index.js'
import type { ResultsProps } from './types.js'

export function ResultsFileOnly({ results, limitTop }: ResultsProps) {
  const { formatedResult, totalDeptScore, impactedFilesNumber } = formatResults(
    results.results,
    limitTop
  )
  let displayResults = formatedResult

  if (limitTop) {
    displayResults = formatedResult
      .sort((a, b) => b.totalScore - a.totalScore)
      .filter((_item, index) => index < limitTop)
  }

  return (
    <>
      <Box marginTop={1} />
      {formatedResult.length > 0 && (
        <Table
          data={displayResults.map(({ fileShortPath, totalScore }) => ({
            file: fileShortPath,
            score: totalScore,
          }))}
        />
      )}
      <Box marginTop={1}>
        <Text bold backgroundColor="#880000" color="white">
          {' '}
          Debt Score: {totalDeptScore} / Impacted files: {impactedFilesNumber}
        </Text>
      </Box>
    </>
  )
} 