import type { Config, WalkReportTagList } from '../types.js'

/**
 * Extracts a mapping of tags to rule IDs from the configuration
 * @param {Config} config - The configuration object containing file rules
 * @returns {Record<string, string[]>} An object where keys are tags and values are arrays of rule IDs
 * @example
 * const config = {
 *   fileRules: [
 *     { id: 'rule1', tags: ['tag1', 'tag2'] },
 *     { id: 'rule2', tags: ['tag1'] }
 *   ]
 * }
 * // Returns: { tag1: ['rule1', 'rule2'], tag2: ['rule1'] }
 */

export const getTagListFromConfig = (config: Config): WalkReportTagList => {
  const tagList =
    config.fileRules?.reduce<Record<string, string[]>>((acc, rule) => {
      rule.tags?.forEach((tag) => {
        if (!acc[tag]) {
          acc[tag] = [rule.id]
        } else if (!acc[tag].includes(rule.id)) {
          acc[tag].push(rule.id)
        }
      })

      return acc
    }, {}) ?? {}

  return tagList
}
