import path from 'path'
import { UserConfig } from '../types.js'

export const loadConfig = async (
  configPath: string
): Promise<
  | {
      isSuccess: true
      config: UserConfig
      error: null
    }
  | {
      isSuccess: false
      config: null
      error: string
    }
> => {
  const fullPath = path.resolve(process.cwd(), configPath)
  try {
    const configData = await import(fullPath)
    return {
      isSuccess: true,
      config: configData.default,
      error: null,
    }
  } catch (error) {
    return {
      isSuccess: false,
      config: null,
      error: `Impossible to load a valid config file at ${fullPath}, create a config file or provide a path to a valid config using the "--config" flag
      ${error}
      `,
    }
  }
}
