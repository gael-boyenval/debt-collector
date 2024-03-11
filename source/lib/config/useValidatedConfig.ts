import { useEffect, useState } from 'react'
import { UserConfig, Config } from '../types'
import getConfigPath from './getConfigPath'
import validateConfig from './validateConfig'

const useValidatedConfig = (
  config?: string
): {
  isConfigValid: boolean | null
  sanitizedConfig: Config | null
  configErrors: string[] | null
  userConfig: UserConfig | null
} => {
  const [isConfigValid, setIsConfigValid] = useState<boolean | null>(null)
  const [sanitizedConfig, setSanitizedConfig] = useState<Config | null>(null)
  const [configErrors, setConfigErrors] = useState<string[] | null>(null)
  const [userConfig, setUserConfig] = useState<UserConfig | null>(null)

  useEffect(() => {
    ;(async () => {
      const configPath = getConfigPath(config)
      try {
        const {
          isConfigValid: isValid,
          sanitizedConfig: cleanConfig,
          configErrors: errors,
          userConfig: baseConfig,
        } = await validateConfig(configPath)

        setUserConfig(baseConfig)
        setSanitizedConfig(cleanConfig)
        setIsConfigValid(isValid)
        setConfigErrors(errors)
      } catch (e) {
        setIsConfigValid(false)
        setConfigErrors([e.message])
      }
    })()
  }, [])

  return {
    isConfigValid,
    sanitizedConfig,
    configErrors,
    userConfig,
  }
}

export default useValidatedConfig
