import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import getConfigPath from './getConfigPath.js'

describe('getConfigPath', () => {
  const originalCwd = process.cwd()

  beforeEach(() => {
    // Mock process.cwd() to return a known path for testing
    process.cwd = () => '/test/project'
  })

  afterEach(() => {
    // Restore original process.cwd()
    process.cwd = () => originalCwd
  })

  it('should return relative path when configPath is provided', () => {
    const configPath = '/test/project/custom/path/config.js'
    const result = getConfigPath(configPath)
    expect(result).toBe('custom/path/config.js')
  })

  it('should return default config path when no configPath is provided', () => {
    const result = getConfigPath('')
    expect(result).toBe('debt-collector.config.js')
  })

  it('should handle absolute paths correctly', () => {
    const configPath = '/test/project/absolute/path/config.js'
    const result = getConfigPath(configPath)
    expect(result).toBe('absolute/path/config.js')
  })

  it('should handle relative paths correctly', () => {
    const configPath = './relative/path/config.js'
    const result = getConfigPath(configPath)
    expect(result).toBe('relative/path/config.js')
  })
}) 