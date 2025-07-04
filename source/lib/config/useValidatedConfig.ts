import { useEffect, useState } from 'react'
import type { Config, UserConfig } from '../types.js'
import getConfigPath from './getConfigPath.js'
import validateConfig from './validateConfig.js'

type PendingConfig = {
  isConfigValid: null
  sanitizedConfig: null
  configErrors: null
  userConfig: null
}

type SuccessConfig = {
  isConfigValid: true
  sanitizedConfig: Config
  configErrors: null
  userConfig: UserConfig
}

type ErrorConfig = {
  isConfigValid: false
  sanitizedConfig: null
  configErrors: string[]
  userConfig: null
}

const useValidatedConfig = (
  config?: string
): PendingConfig | SuccessConfig | ErrorConfig => {
  const [result, setResult] = useState<
    PendingConfig | SuccessConfig | ErrorConfig
  >({
    isConfigValid: null,
    sanitizedConfig: null,
    configErrors: null,
    userConfig: null,
  })

  useEffect(() => {
    ;(async () => {
      const configPath = getConfigPath(config ?? '')
      try {
        const {
          isConfigValid: isValid,
          sanitizedConfig: cleanConfig,
          configErrors: errors,
          userConfig: baseConfig,
        } = await validateConfig(configPath)

        if (!isValid) {
          setResult({
            isConfigValid: false,
            sanitizedConfig: null,
            configErrors: errors,
            userConfig: null,
          })
        } else {
          setResult({
            isConfigValid: true,
            sanitizedConfig: cleanConfig,
            configErrors: null,
            userConfig: baseConfig,
          })
        }
      } catch (e: unknown) {
        setResult({
          isConfigValid: false,
          sanitizedConfig: null,
          configErrors: [e instanceof Error ? e.message : 'Unknown error'],
          userConfig: null,
        })
      }
    })()
  }, [])

  return result
}

export default useValidatedConfig
