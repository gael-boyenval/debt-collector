import { describe, it, expect } from 'vitest'
import { sanitizeConfig } from './sanitizeConfig.js'
import type { Config, SanitizedFileRule, UserConfig } from '../types.js'
import type { ValidateConfigReturn } from './validateConfig.js'

describe('sanitizeConfig', () => {
  it('should convert string values to arrays for include and exclude', () => {
    const userConfig: UserConfig = {
      include: ['**/*.ts'],
      exclude: ['node_modules'],
      fileRules: [],
    }

    const result = sanitizeConfig(userConfig)
    const config = result as Config
    expect(config).toBeDefined()
    expect(config).toEqual({
      include: ['**/*.ts'],
      exclude: ['node_modules'],
      fileRules: [],
    })
  })

  it('should initialize empty arrays for missing include and exclude', () => {
    const userConfig: UserConfig = {
      include: [],
      exclude: [],
      fileRules: [],
    }

    const result = sanitizeConfig(userConfig)
    const config = result as Config
    expect(config).toBeDefined()
    expect(config).toEqual({
      include: [],
      exclude: [],
      fileRules: [],
    })
  })

  it('should apply default values to file rules', () => {
    const fileRule = {
      id: 'RULE_1',
      title: 'Test Rule',
      debtScore: 1,
      include: ['**/*.ts'],
      matchRule: () => 1,
    }

    const userConfig: UserConfig = {
      include: ['**/*.ts'],
      exclude: [],
      fileRules: [fileRule],
    }

    const result = sanitizeConfig(userConfig)
    const config = result as Config
    expect(config).toBeDefined()
    expect(config.fileRules?.[0]).toEqual({
      id: 'RULE_1',
      title: 'Test Rule',
      debtScore: 1,
      include: ['**/*.ts'],
      exclude: [],
      tags: [],
      matchRule: expect.any(Function),
    })
  })

  it('should handle file rules with tags', () => {
    const fileRule = {
      id: 'RULE_1',
      title: 'Test Rule',
      debtScore: 1,
      include: ['**/*.ts'],
      tags: ['test'],
      matchRule: () => 1,
    }

    const userConfig: UserConfig = {
      include: ['**/*.ts'],
      exclude: [],
      fileRules: [fileRule],
    }

    const result = sanitizeConfig(userConfig)
    const config = result as Config
    expect(config).toBeDefined()
    expect(config.fileRules?.[0].tags).toEqual(['test'])
  })

  it('should preserve existing arrays', () => {
    const userConfig: UserConfig = {
      include: ['**/*.ts', '**/*.js'],
      exclude: ['node_modules', 'dist'],
      fileRules: [],
    }

    const result = sanitizeConfig(userConfig)
    const config = result as Config
    expect(config).toBeDefined()
    expect(config).toEqual({
      include: ['**/*.ts', '**/*.js'],
      exclude: ['node_modules', 'dist'],
      fileRules: [],
    })
  })
})
