import { describe, it, expect } from 'vitest'
import { findJsImportFrom } from './findJsImportFrom.js'

describe('findJsImportFrom', () => {
  it('should find import from specific package', () => {
    const data = "import React from 'react'"
    const result = findJsImportFrom(data)('React', 'react')
    expect(result).toBe(1)
  })

  it('should return 0 when import not found', () => {
    const data = "import { useState } from 'react'"
    const result = findJsImportFrom(data)('React', 'react')
    expect(result).toBe(0)
  })

  it('should work with partial matches', () => {
    const data = "import { useState, useEffect } from 'react'"
    const result = findJsImportFrom(data)('useState', 'react')
    expect(result).toBe(1)
  })

  it('should handle multiple imports from same package', () => {
    const data = `
      import React from 'react'
      import { useState, useEffect } from 'react'
    `
    const result = findJsImportFrom(data)('React', 'react')
    expect(result).toBe(1)
  })

  it('should handle aliased imports', () => {
    const data = "import { useState as useReactState } from 'react'"
    const result = findJsImportFrom(data)('useState', 'react')
    expect(result).toBe(1)
  })

  it('should handle namespace imports', () => {
    const data = "import * as React from 'react'"
    const result = findJsImportFrom(data)('React', 'react')
    expect(result).toBe(1)
  })

  it('should handle dynamic imports', () => {
    const data = "const React = await import('react')"
    const result = findJsImportFrom(data)('React', 'react')
    expect(result).toBe(1)
  })

  it('should handle TypeScript type imports', () => {
    const data = "import type { FC } from 'react'"
    const result = findJsImportFrom(data)('FC', 'react')
    expect(result).toBe(1)
  })

  it('should handle mixed import styles', () => {
    const data = `
      import React from 'react'
      import type { FC } from 'react'
      import { useState as useReactState } from 'react'
      import * as ReactDOM from 'react-dom'
    `
    const result = findJsImportFrom(data)('React', 'react')
    expect(result).toBe(1)
  })

  it('should handle imports with line breaks', () => {
    const data = `
      import {
        useState,
        useEffect,
        useCallback
      } from 'react'
    `
    const result = findJsImportFrom(data)('useState', 'react')
    expect(result).toBe(1)
  })

  it('should detect static imports with single quotes', () => {
    const data = `import { foo } from 'bar'`
    const result = findJsImportFrom(data)('foo', 'bar')
    expect(result).toBe(1)
  })

  it('should detect static imports with double quotes', () => {
    const data = `import { foo } from "bar"`
    const result = findJsImportFrom(data)('foo', 'bar')
    expect(result).toBe(1)
  })

  it('should detect static imports with different spacing', () => {
    const data = `import {foo} from 'bar'`
    const result = findJsImportFrom(data)('foo', 'bar')
    expect(result).toBe(1)
  })

  it('should detect namespace imports with single quotes', () => {
    const data = `import * as foo from 'bar'`
    const result = findJsImportFrom(data)(undefined, 'bar')
    expect(result).toBe(1)
  })

  it('should detect namespace imports with double quotes', () => {
    const data = `import * as foo from "bar"`
    const result = findJsImportFrom(data)(undefined, 'bar')
    expect(result).toBe(1)
  })

  it('should detect dynamic imports with single quotes', () => {
    const data = `import('bar')`
    const result = findJsImportFrom(data)(undefined, 'bar')
    expect(result).toBe(1)
  })

  it('should detect dynamic imports with double quotes', () => {
    const data = `import("bar")`
    const result = findJsImportFrom(data)(undefined, 'bar')
    expect(result).toBe(1)
  })

  it('should detect imports with special characters in paths', () => {
    const data = `import { foo } from '@my-org/package-name'`
    const result = findJsImportFrom(data)('foo', '@my-org/package-name')
    expect(result).toBe(1)
  })

  it('should detect imports with underscores in paths', () => {
    const data = `import { foo } from 'my_package'`
    const result = findJsImportFrom(data)('foo', 'my_package')
    expect(result).toBe(1)
  })

  it('should return 0 when no match is found', () => {
    const data = `import { foo } from 'bar'`
    const result = findJsImportFrom(data)('baz', 'qux')
    expect(result).toBe(0)
  })

  it('should handle multiple imports in the same file', () => {
    const data = `
      import { foo } from 'bar'
      import * as baz from 'qux'
      import('dynamic')
    `
    const result = findJsImportFrom(data)('foo', 'bar')
    expect(result).toBe(1)
  })

  it('should detect any import from a package when first parameter is null', () => {
    const data = `import { foo } from 'bar'`
    const result = findJsImportFrom(data)(null, 'bar')
    expect(result).toBe(1)
  })

  it('should detect any import from a package when first parameter is undefined', () => {
    const data = `import { foo } from 'bar'`
    const result = findJsImportFrom(data)(undefined, 'bar')
    expect(result).toBe(1)
  })

  it('should detect any type of import from a package when first parameter is null', () => {
    const data = `
      import { foo } from 'bar'
      import * as baz from 'bar'
      import('bar')
    `
    const result = findJsImportFrom(data)(null, 'bar')
    expect(result).toBe(1)
  })

  it('should return 0 when no imports from package found, even with null first parameter', () => {
    const data = `import { foo } from 'other-package'`
    const result = findJsImportFrom(data)(null, 'bar')
    expect(result).toBe(0)
  })

  it('should detect imports from package with special characters when first parameter is null', () => {
    const data = `import { foo } from '@my-org/package-name'`
    const result = findJsImportFrom(data)(null, '@my-org/package-name')
    expect(result).toBe(1)
  })

  it('should detect any import from a list of imports', () => {
    const data = `import { foo } from 'bar'`
    const result = findJsImportFrom(data)(['foo', 'baz'], 'bar')
    expect(result).toBe(1)
  })

  it('should detect any import from a list of imports with null values', () => {
    const data = `import { foo } from 'bar'`
    const result = findJsImportFrom(data)(['foo', null, 'baz'], 'bar')
    expect(result).toBe(1)
  })

  it('should detect any import from a list of imports with undefined values', () => {
    const data = `import { foo } from 'bar'`
    const result = findJsImportFrom(data)(['foo', undefined, 'baz'], 'bar')
    expect(result).toBe(1)
  })

  it('should return 0 when none of the imports in the list are found', () => {
    const data = `import { foo } from 'bar'`
    const result = findJsImportFrom(data)(['baz', 'qux'], 'bar')
    expect(result).toBe(0)
  })

  it('should detect imports from a list with mixed styles', () => {
    const data = `
      import { foo } from 'bar'
      import * as baz from 'bar'
      import('bar')
    `
    const result = findJsImportFrom(data)(['foo', 'baz', null], 'bar')
    expect(result).toBe(1)
  })

  it('should handle empty array as first parameter by detecting any import from the package', () => {
    const data = `import { foo } from 'bar'`
    const result = findJsImportFrom(data)([], 'bar')
    expect(result).toBe(1)
  })

  it('should handle array with only null values', () => {
    const data = `import { foo } from 'bar'`
    const result = findJsImportFrom(data)([null, null], 'bar')
    expect(result).toBe(1)
  })

  it('should handle array with only undefined values', () => {
    const data = `import { foo } from 'bar'`
    const result = findJsImportFrom(data)([undefined, undefined], 'bar')
    expect(result).toBe(1)
  })
}) 