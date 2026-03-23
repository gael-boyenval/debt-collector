export type DomFilter = string | (string | RegExp)[] | RegExp

type AttrFilter = { name: DomFilter; value?: DomFilter }

export interface DomMatchChain {
  tag: (filter: DomFilter) => DomMatchChain
  attribute: (name: DomFilter, value?: DomFilter) => DomMatchChain
  count: () => number
  find: () => 0 | 1
}

type ParsedAttr = { name: string; value: string | undefined }
type ParsedTag = { tagName: string; attrs: ParsedAttr[] }

// Flat single-level alternation avoids catastrophic backtracking.
// The previous nested `(?:\s+(?:...)*)*` pattern caused exponential backtracking
// because `\s+` and `[^>"'{}]` overlap (whitespace is matched by both).
const TAG_REGEX =
  /<([A-Za-z][A-Za-z0-9._:-]*)((?:[^>"'{}]|"[^"]*"|'[^']*'|\{[^}]*\})*)\s*\/?>/g

const ATTR_REGEX =
  /([@:[(]*[A-Za-z_][A-Za-z0-9._:@\-\])]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|\{([^}]*)\}))?/g

const parseTags = (data: string): ParsedTag[] => {
  const tags: ParsedTag[] = []
  let tagMatch: RegExpExecArray | null

  while ((tagMatch = TAG_REGEX.exec(data)) !== null) {
    const tagName = tagMatch[1]!
    const attrString = tagMatch[2] ?? ''
    const attrs: ParsedAttr[] = []
    let attrMatch: RegExpExecArray | null

    ATTR_REGEX.lastIndex = 0
    while ((attrMatch = ATTR_REGEX.exec(attrString)) !== null) {
      attrs.push({
        name: attrMatch[1]!,
        value: attrMatch[2] ?? attrMatch[3] ?? attrMatch[4],
      })
    }

    tags.push({ tagName, attrs })
  }

  TAG_REGEX.lastIndex = 0
  return tags
}

const matchesFilter = (value: string, filter: DomFilter): boolean => {
  if (filter instanceof RegExp) return filter.test(value)
  if (Array.isArray(filter))
    return filter.some((f) =>
      f instanceof RegExp ? f.test(value) : value === f,
    )
  return value === filter
}

const BINDING_SYNTAX_RE = /^\[?\(?(.*?)\)?\]?$/

const stripBindingSyntax = (name: string): string =>
  BINDING_SYNTAX_RE.exec(name)?.[1] ?? name

const tagMatchesAttrFilter = (
  tag: ParsedTag,
  { name, value }: AttrFilter,
): boolean => {
  const matchingAttrs = tag.attrs.filter(
    (a) =>
      matchesFilter(a.name, name) ||
      matchesFilter(stripBindingSyntax(a.name), name),
  )
  if (matchingAttrs.length === 0) return false
  if (value === undefined) return true
  return matchingAttrs.some((a) => a.value !== undefined && matchesFilter(a.value, value))
}

// Accepts already-parsed tags so chains derived via .tag()/.attribute() reuse
// the same ParsedTag[] without re-running parseTags on every .count()/.find().
const execute = (
  tags: ParsedTag[],
  tagFilter: DomFilter | undefined,
  attrFilters: AttrFilter[],
): number =>
  tags.filter((tag) => {
    if (tagFilter && !matchesFilter(tag.tagName, tagFilter)) return false
    return attrFilters.every((af) => tagMatchesAttrFilter(tag, af))
  }).length

const createChain = (
  tags: ParsedTag[],
  tagFilter?: DomFilter,
  attrFilters: AttrFilter[] = [],
): DomMatchChain => ({
  tag: (filter) => createChain(tags, filter, attrFilters),
  attribute: (name, value?) =>
    createChain(tags, tagFilter, [...attrFilters, { name, value }]),
  count: () => execute(tags, tagFilter, attrFilters),
  find: () => (execute(tags, tagFilter, attrFilters) > 0 ? 1 : 0),
})

/**
 * Chainable utility for querying DOM-like markup (HTML, JSX, Vue, Angular).
 * Supports filtering by tag names, attribute names, and attribute values.
 * All filters accept `string | string[] | RegExp`.
 *
 * @example
 * const dm = domMatch(content)
 * dm.tag('div').attribute('className').count()
 * dm.tag(['input', 'select']).attribute('required').find()
 * dm.attribute('disabled').count()
 * dm.tag(/^Legacy/).attribute('variant', 'primary').count()
 */
export const domMatch = (data: string): DomMatchChain =>
  createChain(parseTags(data))
