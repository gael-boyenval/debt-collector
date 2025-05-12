import path from 'path'

const getConfigPath = (configPath: string): string =>
  configPath
    ? path.relative(process.cwd(), configPath)
    : path.relative(process.cwd(), './debt-collector.config.js')

export default getConfigPath
