import escapeStringRegexp from 'escape-string-regexp-node'

export const findAttributesInTag =
  (data: string) =>
  (
    attributes?: string | null | (string | null | undefined)[],
    tagName?: string
  ): 0 | 1 => {
    if (!tagName) return 0

    // Escape the tag name for regex
    const escapedTagName = escapeStringRegexp(tagName)

    // Create pattern for attributes
    let attributePattern = ''
    if (Array.isArray(attributes) && attributes.length > 0) {
      attributePattern = attributes
        .map((attr) => escapeStringRegexp(attr ?? ''))
        .join('|')
    } else if (typeof attributes === 'string') {
      attributePattern = escapeStringRegexp(attributes)
    }

    // Match both HTML and JSX syntax with specific attributes
    const tagRegex = new RegExp(
      `<${escapedTagName}\\s+[^>]*(${attributePattern})[^>]*>|<${escapedTagName}\\s+[^>]*(${attributePattern})[^>]*\\/>`,
      'gm'
    )

    const matches = Array.from(data.matchAll(tagRegex), (m) => m[0])
    return matches.length > 0 ? 1 : 0
  }
