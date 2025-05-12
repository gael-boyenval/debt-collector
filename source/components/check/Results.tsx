import { Text, Box } from 'ink'
import Table from '../Table.js'
import { formatResults } from '../../lib/utils/index.js'
import type { ResultsProps } from './types.js'

export const Results = ({ results, limitTop }: ResultsProps) => {
  const { formatedResult, totalDeptScore, impactedFilesNumber } = formatResults(
    results.results,
    limitTop
  )

  return (
    <>
      {formatedResult.length > 0 &&
        formatedResult.map((result) => (
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
      <Box marginTop={1}>
        <Text bold backgroundColor="#880000" color="white">
          {' '}
          Debt Score: {totalDeptScore} / Impacted files: {impactedFilesNumber}
        </Text>
      </Box>
    </>
  )
} 