import { Text, Box } from 'ink'
import Table from '../Table.js'
import { filterNoMatch } from '../../lib/utils/index.js'
import type { ResultsNoMatchRuleProps } from './types.js'

export function ResultsNoMatchRule({ results, initialConfig }: ResultsNoMatchRuleProps) {
  const { notMatchRules, rulesCount } = filterNoMatch(results.results, initialConfig)

  return (
    <>
      <Box marginTop={1} />
      {notMatchRules.length > 0 && <Table data={notMatchRules} />}
      <Box marginTop={1}>
        <Text bold backgroundColor="#880000" color="white">
          Nb of rules with no match : {notMatchRules.length} /{rulesCount}
        </Text>
      </Box>
    </>
  )
} 