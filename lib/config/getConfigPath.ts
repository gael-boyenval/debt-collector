import path from 'path'

const getConfigPath = (config) =>
  config
    ? path.relative(process.cwd(), config)
    : path.relative(process.cwd(), './debt-collector.config.js')

export default getConfigPath
