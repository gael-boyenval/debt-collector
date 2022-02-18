import path from 'path';

export const getConfigPath = (config) => (config
  ? path.relative(process.cwd(), config)
  : path.relative(process.cwd(), './debt-collector.config.js'));
