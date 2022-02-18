import { useEffect, useState } from 'react';
import { getConfigPath } from './utils';
import validateConfig from './validateConfig';

const useValidatedConfig = (config) => {
  const [isConfigValidated, setIsConfigValidated] = useState(null);
  const [updatedConfig, setUpdatedConfig] = useState(null);
  const [configErrors, setConfigErrors] = useState(null);
  const [defaultConfig, setDefaultConfig] = useState(null);

  useEffect(() => {
    (async () => {
      const configPath = getConfigPath(config);
      const {
        isConfigValid, verifiedConfig, configErrors, defaultConfig,
      } = await validateConfig(configPath);
      setDefaultConfig(defaultConfig);
      setUpdatedConfig(verifiedConfig);
      setIsConfigValidated(isConfigValid);
      setConfigErrors(configErrors);
    })();
  }, []);

  return {
    isConfigValidated,
    updatedConfig,
    configErrors,
    defaultConfig,
  };
};

export default useValidatedConfig;
