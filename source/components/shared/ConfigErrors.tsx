import { Text } from 'ink'

export const ConfigErrors = ({
  isConfigValid,
  configErrors,
}: {
  isConfigValid: boolean | null
  configErrors: string[] | null
}) => {
  const shouldShowErrors =
    isConfigValid === false && configErrors && configErrors.length > 0
  return shouldShowErrors
    ? configErrors.map((error: any, i: any) => (
        <Text key={i} color="red">
          {error}
        </Text>
      ))
    : null
}
