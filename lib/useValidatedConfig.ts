import { useEffect, useState } from 'react';
import { getConfigPath } from './utils'
import validateConfig from './validateConfig'

const useValidatedConfig = (config) => {
  const [isConfigValidated, setIsConfigValidated] = useState(null)
  const [updatedConfig, setUpdatedConfig] = useState(null)

  useEffect(() => {
		(async() => {
			const configPath = getConfigPath(config)
			const { isConfigValid, verifiedConfig } = await validateConfig(configPath)
			
			setUpdatedConfig(verifiedConfig)
			setIsConfigValidated(isConfigValid)
		})()
	}, [])

  return {
    isConfigValidated,
    updatedConfig,
  }
}

export default useValidatedConfig