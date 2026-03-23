import type { MatchRuleUtils } from '../types.js'
import { findJsImportFrom } from './findJsImportFrom.js'
import { countAll } from './countAll.js'
import { findOne } from './findOne.js'
import { findOneOf } from './findOneOf.js'
import { countAllOf } from './countAllOf.js'
import { findAttributesInTag } from './findAttributesInTag.js'
import { domMatch } from './domMatch.js'

/**
 * Builds a `MatchRuleUtils` object for a single file.
 * All utilities share the same pre-parsed DOM tags and content,
 * so this should be called once per file and passed to all rule
 * checking functions.
 */
export const createMatchRuleUtils = (
  file: string,
  data: string
): MatchRuleUtils => ({
  content: data,
  file,
  countAll: countAll(data),
  findOne: findOne(data),
  findOneOf: findOneOf(data),
  countAllOf: countAllOf(data),
  findJsImportFrom: findJsImportFrom(data),
  findAttributesInTag: findAttributesInTag(data),
  domMatch: domMatch(data),
})
