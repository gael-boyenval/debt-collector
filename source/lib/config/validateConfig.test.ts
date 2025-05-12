import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { UserConfig } from '../types.js'
import * as loadConfig from './loadConfig.js'
// Mock at the top
vi.mock('./loadConfig.js')

import validateConfig from './validateConfig.js'

const mockLoadConfig = (result: any) => {
  vi.mocked(loadConfig.loadConfig).mockResolvedValue({
    isSuccess: true,
    config: result,
    error: null,
  })
}

const mockConfig: UserConfig = {
  include: ['**/*.ts'],
  exclude: ['node_modules'],
  fileRules: [
    {
      id: 'RULE_1',
      title: 'Test Rule',
      debtScore: 1,
      include: ['**/*.ts'],
      matchRule: () => 1,
    },
  ],
}

describe('validateConfig', () => {
  it('should validate a valid config', async () => {
    mockLoadConfig(mockConfig)
    const result = await validateConfig('any-path')
    expect(result.isConfigValid).toBe(true)
    expect(result.configErrors).toHaveLength(0)
    expect(result.sanitizedConfig).toBeDefined()
    expect(result.userConfig).toBeDefined()
  })

  it('should handle missing include key', async () => {
    const invalidConfig: Partial<UserConfig> = {
      fileRules: mockConfig.fileRules,
    }
    mockLoadConfig(invalidConfig)
    const result = await validateConfig('any-path')
    expect(result.isConfigValid).toBe(false)
    expect(result.configErrors).toMatchInlineSnapshot(`
      [
        "Provide a "include" key with a glob pattern in your configuration ex: include: ["./**/*"]",
      ]
    `)
  })

  it('should handle empty include array', async () => {
    const invalidConfig: UserConfig = {
      include: [],
      fileRules: mockConfig.fileRules,
    }
    mockLoadConfig(invalidConfig)
    const result = await validateConfig('any-path')
    expect(result.isConfigValid).toBe(false)
    expect(result.configErrors).toMatchInlineSnapshot(`
      [
        "The "include" key must be an array containing at least one glob pattern",
      ]
    `)
  })

  it('should handle non-array include value', async () => {
    const invalidConfig = {
      include: '**/*.ts',
      fileRules: mockConfig.fileRules,
    }
    mockLoadConfig(invalidConfig)
    const result = await validateConfig('any-path')
    expect(result.isConfigValid).toBe(false)
    expect(result.configErrors).toMatchInlineSnapshot(`
      [
        "The "include" key must be an array containing at least one glob pattern",
      ]
    `)
  })

  it('should handle empty include array in rule', async () => {
    const invalidConfig: UserConfig = {
      include: ['**/*.ts'],
      fileRules: [
        {
          id: 'RULE_1',
          title: 'Test Rule',
          debtScore: 1,
          include: [],
          matchRule: () => 1,
        },
      ],
    }
    mockLoadConfig(invalidConfig)
    const result = await validateConfig('any-path')
    expect(result.isConfigValid).toBe(false)
    expect(result.configErrors).toContain(
      'Rule "RULE_1" at index 0 must have an "include" array containing at least one glob pattern'
    )
  })

  it('should handle non-array include value in rule', async () => {
    const invalidConfig = {
      include: ['**/*.ts'],
      fileRules: [
        {
          id: 'RULE_1',
          title: 'Test Rule',
          debtScore: 1,
          include: '**/*.ts',
          matchRule: () => 1,
        },
      ],
    }
    mockLoadConfig(invalidConfig)
    const result = await validateConfig('any-path')
    expect(result.isConfigValid).toBe(false)
    expect(result.configErrors).toContain(
      'Rule "RULE_1" at index 0 must have an "include" array containing at least one glob pattern'
    )
  })

  it('should handle missing rules', async () => {
    const invalidConfig: UserConfig = {
      include: ['**/*.ts'],
      exclude: ['node_modules'],
    }
    mockLoadConfig(invalidConfig)
    const result = await validateConfig('any-path')
    expect(result.isConfigValid).toBe(false)
    expect(result.configErrors).toContain(
      'Your config does not have any rules, please create "fileRules" key'
    )
  })

  it('should handle duplicate rule IDs', async () => {
    const invalidConfig: UserConfig = {
      include: ['**/*.ts'],
      fileRules: [
        {
          id: 'RULE_1',
          title: 'Test Rule 1',
          debtScore: 1,
          include: ['**/*.ts'],
          matchRule: () => 1,
        },
        {
          id: 'RULE_1',
          title: 'Test Rule 2',
          debtScore: 1,
          include: ['**/*.ts'],
          matchRule: () => 1,
        },
      ],
    }
    mockLoadConfig(invalidConfig)
    const result = await validateConfig('any-path')
    expect(result.isConfigValid).toBe(false)
    expect(result.configErrors).toContain(
      'Duplicate rule ID "RULE_1" found at index 1. Each rule must have a unique ID.'
    )
  })

  it('should handle rules without include or matchRule', async () => {
    const invalidConfig: UserConfig = {
      include: ['**/*.ts'],
      fileRules: [
        // @ts-expect-error - This is a test
        {
          id: 'RULE_1',
          title: 'Test Rule',
          debtScore: 1,
        },
      ],
    }
    mockLoadConfig(invalidConfig)
    const result = await validateConfig('any-path')
    expect(result.isConfigValid).toBe(false)
    expect(result.configErrors).toContain(
      'Rule "RULE_1" at index 0 must have either an "include" pattern or a "matchRule" function.'
    )
  })

  it('should handle invalid config file', async () => {
    mockLoadConfig({})
    vi.mocked(loadConfig.loadConfig).mockResolvedValue({
      isSuccess: false,
      config: null,
      error:
        'Impossible to load a valid config file at any-path, create a config file or provide a path to a valid config using the "--config" flag',
    })
    const result = await validateConfig('any-path')
    expect(result.isConfigValid).toBe(false)
    expect(result.configErrors).toContain(
      'Impossible to load a valid config file at any-path, create a config file or provide a path to a valid config using the "--config" flag'
    )
  })
})
