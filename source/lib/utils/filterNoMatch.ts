import { Config, FileResults } from '../types.js'

export const filterNoMatch = (
  results: FileResults[],
  initialConfig: Config | null
) => {
  const allRules = [
    ...(initialConfig?.fileRules?.map(
      ({ id, title }: { id: string; title: string }) => ({ id, title })
    ) ?? []),
  ]

  const allFilesRules = results
    .map((file) => file.brokenRules.map(({ ruleId }) => ruleId))
    .flat(1)
  const existingRules = Array.from(new Set([...allFilesRules]))

  const filteredRules = allRules.filter(({ id }) => !existingRules.includes(id))

  return {
    notMatchRules: filteredRules,
    rulesCount: allRules.length,
    existingRulesCount: existingRules.length,
  }
}
