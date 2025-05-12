import { describe, it, expect } from 'vitest'
import { findAttributesInTag } from './findAttributesInTag.js'

describe('findAttributesInTag', () => {
  const content = `
    <div className="container" data-test>
      <input type="text" required disabled />
      <button onClick={handleClick} className="btn">
      <span class="text" id="test">
    </div>
  `

  it('should find a single attribute in a tag', () => {
    expect(findAttributesInTag(content)('className', 'div')).toBe(1)
    expect(findAttributesInTag(content)('type', 'input')).toBe(1)
    expect(findAttributesInTag(content)('onClick', 'button')).toBe(1)
  })

  it('should find multiple attributes in a tag', () => {
    expect(findAttributesInTag(content)(['className', 'data-test'], 'div')).toBe(1)
    expect(findAttributesInTag(content)(['type', 'required', 'disabled'], 'input')).toBe(1)
    expect(findAttributesInTag(content)(['onClick', 'className'], 'button')).toBe(1)
  })

  it('should return 0 when attribute is not found', () => {
    expect(findAttributesInTag(content)('not-found', 'div')).toBe(0)
    expect(findAttributesInTag(content)('className', 'span')).toBe(0)
  })

  it('should return 0 when tag is not found', () => {
    expect(findAttributesInTag(content)('className', 'not-found')).toBe(0)
  })

  it('should work with HTML and JSX syntax', () => {
    expect(findAttributesInTag(content)('class', 'span')).toBe(1)
    expect(findAttributesInTag(content)('className', 'div')).toBe(1)
  })

  it('should handle boolean attributes', () => {
    expect(findAttributesInTag(content)('required', 'input')).toBe(1)
    expect(findAttributesInTag(content)('disabled', 'input')).toBe(1)
  })
}) 