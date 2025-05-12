import escapeStringRegexp from 'escape-string-regexp-node'

export const findJsImportFrom =
  (data: string) =>
  (importee?: string | null | (string | null | undefined)[], from?: string): 0 | 1 => {
    // Handle static imports with both single and double quotes
    const staticImportRegexp = new RegExp(
      `import\\s+[A-z0-9,\\s{]*${Array.isArray(importee) && importee.length > 0
        ? importee.map(i => escapeStringRegexp(i ?? '')).join('|')
        : typeof importee === 'string'
          ? escapeStringRegexp(importee)
          : ''}[A-z0-9,\\s}]*\\s+from\\s+['"][A-z0-9.\/\\-_]*${escapeStringRegexp(
        from ?? ''
      )}[A-z0-9.\/\\-_]*['"]`,
      'gm'
    )

    // Handle namespace imports with both single and double quotes
    const namespaceImportRegexp = new RegExp(
      `import\\s+\\*\\s+as\\s+[A-z0-9_]+\\s+from\\s+['"][A-z0-9.\/\\-_]*${escapeStringRegexp(
        from ?? ''
      )}[A-z0-9.\/\\-_]*['"]`,
      'gm'
    )

    // Handle dynamic imports with both single and double quotes
    const dynamicImportRegexp = new RegExp(
      `import\\(['"][A-z0-9.\/\\-_]*${escapeStringRegexp(
        from ?? ''
      )}[A-z0-9.\/\\-_]*['"]\\)`,
      'gm'
    )

    const staticMatches = Array.from(data.matchAll(staticImportRegexp), (m) => m[0])
    const namespaceMatches = Array.from(data.matchAll(namespaceImportRegexp), (m) => m[0])
    const dynamicMatches = Array.from(data.matchAll(dynamicImportRegexp), (m) => m[0])

    return (staticMatches.length + namespaceMatches.length + dynamicMatches.length) > 0 ? 1 : 0
  } 