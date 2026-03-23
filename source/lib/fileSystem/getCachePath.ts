import path from 'path'
import fs from 'fs'
import os from 'os'

// Returns a cross-platform, virtual-env-safe cache directory for debt-collector
export function getCachePath() {
  // Try node_modules/.cache/debt-collector relative to cwd
  const nodeModulesCache = path.join(
    process.cwd(),
    'node_modules',
    '.cache',
    'debt-collector'
  )
  try {
    fs.mkdirSync(nodeModulesCache, { recursive: true })
    fs.accessSync(nodeModulesCache, fs.constants.W_OK)
    return nodeModulesCache
  } catch {
    // Fallback to OS temp dir
    const tmpCache = path.join(os.tmpdir(), 'debt-collector')
    try {
      fs.mkdirSync(tmpCache, { recursive: true })
      fs.accessSync(tmpCache, fs.constants.W_OK)
      return tmpCache
    } catch {
      // Fallback to user home cache
      const homeCache = path.join(os.homedir(), '.cache', 'debt-collector')
      fs.mkdirSync(homeCache, { recursive: true })
      return homeCache
    }
  }
}
