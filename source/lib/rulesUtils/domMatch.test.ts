import { describe, it, expect } from 'vitest'
import { domMatch } from './domMatch.js'

const htmlContent = `
<div className="container" data-test>
  <input type="text" required disabled />
  <button onClick={handleClick} className="btn">
  <span class="text" id="test">
  <img src="hero.png" alt="hero image" />
  <img src="icon.png" />
</div>
`

const jsxContent = `
<LegacyButton variant="primary" size="lg" disabled>Click</LegacyButton>
<LegacyInput value={name} onChange={setName} />
<Button variant="secondary" size="sm">OK</Button>
<Card title="hello" />
<DsModal title="hello">
  <DsModal.Header>
    <DsModal.Title>Hello</DsModal.Title>
  </DsModal.Header>
  <DsModal.Body>
    <p>Hello</p>
  </DsModal.Body>
  <DsModal.Footer>
    <DsModal.Button>Close</DsModal.Button>
  </DsModal.Footer>
</DsModal>
`

const vueContent = `
<template>
  <div v-if="show" :class="dynamicClass" @click="handler">
    <input v-model="value" :disabled="isDisabled" />
    <MyComponent :title="pageTitle" @update="onUpdate" />
  </div>
</template>
`

const angularContent = `
<div [ngClass]="classes" (click)="onClick()">
  <input [disabled]="isDisabled" [(ngModel)]="value" />
  <app-header [title]="pageTitle" (close)="onClose()"></app-header>
</div>
`

const multiLineContent = `
<Button
  variant="primary"
  size="lg"
  disabled
  onClick={handler}
>
  Submit
</Button>
<Input
  type="text"
  required
/>
`

describe('domMatch', () => {
  describe('tag() standalone', () => {
    it('counts matching tags', () => {
      expect(domMatch(htmlContent).tag('div').count()).toBe(1)
      expect(domMatch(htmlContent).tag('img').count()).toBe(2)
      expect(domMatch(htmlContent).tag('input').count()).toBe(1)
    })

    it('returns 0 for non-existent tags', () => {
      expect(domMatch(htmlContent).tag('footer').count()).toBe(0)
    })

    it('supports string array (OR)', () => {
      expect(domMatch(htmlContent).tag(['div', 'span']).count()).toBe(2)
      expect(domMatch(htmlContent).tag(['img', 'input']).count()).toBe(3)
    })

    it('supports regex', () => {
      expect(domMatch(jsxContent).tag(/^Legacy/).count()).toBe(2)
      expect(domMatch(jsxContent).tag(/Button$/).count()).toBe(3)
      expect(domMatch(jsxContent).tag(/^(?:Button|Card)$/).count()).toBe(2)
    })

    it('find() returns 0 | 1', () => {
      expect(domMatch(htmlContent).tag('div').find()).toBe(1)
      expect(domMatch(htmlContent).tag('footer').find()).toBe(0)
    })
  })

  describe('attribute() standalone', () => {
    it('finds tags with a given attribute (any tag)', () => {
      expect(domMatch(htmlContent).attribute('className').count()).toBe(2)
      expect(domMatch(htmlContent).attribute('disabled').count()).toBe(1)
    })

    it('supports string array for attribute name (OR)', () => {
      expect(domMatch(htmlContent).attribute(['class', 'className']).count()).toBe(3)
    })

    it('supports regex for attribute name', () => {
      expect(domMatch(htmlContent).attribute(/^data-/).count()).toBe(1)
      expect(domMatch(htmlContent).attribute(/class/i).count()).toBe(3)
    })

    it('matches attribute with specific value', () => {
      expect(domMatch(htmlContent).attribute('type', 'text').count()).toBe(1)
      expect(domMatch(htmlContent).attribute('type', 'number').count()).toBe(0)
    })

    it('matches attribute with array of values (OR)', () => {
      expect(domMatch(jsxContent).attribute('variant', ['primary', 'secondary']).count()).toBe(2)
      expect(domMatch(jsxContent).attribute('size', ['lg', 'xl']).count()).toBe(1)
    })

    it('matches attribute with regex value', () => {
      expect(domMatch(htmlContent).attribute('alt', /^hero/).count()).toBe(1)
      expect(domMatch(htmlContent).attribute('src', /\.png$/).count()).toBe(2)
    })

    it('does not match boolean attributes when a value filter is given', () => {
      expect(domMatch(htmlContent).attribute('disabled', 'true').count()).toBe(0)
    })
  })

  describe('tag() + attribute() chaining', () => {
    it('filters by tag then attribute', () => {
      expect(domMatch(htmlContent).tag('div').attribute('className').count()).toBe(1)
      expect(domMatch(htmlContent).tag('img').attribute('src').count()).toBe(2)
      expect(domMatch(htmlContent).tag('button').attribute('className').count()).toBe(1)
      expect(domMatch(htmlContent).tag('span').attribute('className').count()).toBe(0)
    })

    it('supports tag array with attribute', () => {
      expect(
        domMatch(htmlContent).tag(['div', 'button']).attribute('className').count(),
      ).toBe(2)
    })

    it('chains multiple attributes (AND logic)', () => {
      expect(
        domMatch(jsxContent).tag('LegacyButton').attribute('variant').attribute('size').count(),
      ).toBe(1)
      expect(
        domMatch(jsxContent)
          .tag('LegacyButton')
          .attribute('variant', 'primary')
          .attribute('size', 'lg')
          .count(),
      ).toBe(1)
      expect(
        domMatch(jsxContent)
          .tag('LegacyButton')
          .attribute('variant', 'primary')
          .attribute('size', 'sm')
          .count(),
      ).toBe(0)
    })

    it('tag regex + attribute value', () => {
      expect(
        domMatch(jsxContent).tag(/^Legacy/).attribute('variant', 'primary').count(),
      ).toBe(1)
    })

    it('matches compound tags', () => {
      expect(
        domMatch(jsxContent).tag('DsModal').count(),
      ).toBe(1)
      expect(
        domMatch(jsxContent).tag('DsModal.Header').count(),
      ).toBe(1)
    })
  })

  describe('JSX / TSX syntax', () => {
    it('matches PascalCase component names', () => {
      expect(domMatch(jsxContent).tag('Card').count()).toBe(1)
      expect(domMatch(jsxContent).tag('LegacyButton').count()).toBe(1)
    })

    it('matches JSX expression attribute values', () => {
      expect(domMatch(jsxContent).attribute('value', 'name').count()).toBe(1)
      expect(domMatch(jsxContent).attribute('onChange', 'setName').count()).toBe(1)
    })

    it('handles self-closing JSX', () => {
      expect(domMatch(jsxContent).tag('LegacyInput').count()).toBe(1)
      expect(domMatch(jsxContent).tag('Card').count()).toBe(1)
    })
  })

  describe('Vue syntax', () => {
    it('matches Vue directive attributes', () => {
      expect(domMatch(vueContent).attribute('v-if').count()).toBe(1)
      expect(domMatch(vueContent).attribute('v-model').count()).toBe(1)
    })

    it('matches Vue shorthand bindings', () => {
      expect(domMatch(vueContent).attribute(':class').count()).toBe(1)
      expect(domMatch(vueContent).attribute(':disabled').count()).toBe(1)
      expect(domMatch(vueContent).attribute(':title').count()).toBe(1)
    })

    it('matches Vue event handlers', () => {
      expect(domMatch(vueContent).attribute('@click').count()).toBe(1)
      expect(domMatch(vueContent).attribute('@update').count()).toBe(1)
    })

    it('matches Vue attributes with regex', () => {
      expect(domMatch(vueContent).attribute(/^v-/).count()).toBe(2)
      expect(domMatch(vueContent).attribute(/^:/).count()).toBe(3)
      expect(domMatch(vueContent).attribute(/^@/).count()).toBe(2)
    })
  })

  describe('Angular syntax', () => {
    it('matches Angular property bindings', () => {
      expect(domMatch(angularContent).attribute('[ngClass]').count()).toBe(1)
      expect(domMatch(angularContent).attribute('[disabled]').count()).toBe(1)
      expect(domMatch(angularContent).attribute('[title]').count()).toBe(1)
      expect(domMatch(angularContent).attribute('ngClass').count()).toBe(1)
      expect(domMatch(angularContent).attribute('disabled').count()).toBe(1)
      expect(domMatch(angularContent).attribute('title').count()).toBe(1)
    })

    it('matches Angular event bindings', () => {
      expect(domMatch(angularContent).attribute('(click)').count()).toBe(1)
      expect(domMatch(angularContent).attribute('(close)').count()).toBe(1)
      expect(domMatch(angularContent).attribute('click').count()).toBe(1)
      expect(domMatch(angularContent).attribute('close').count()).toBe(1)
    })

    it('matches Angular two-way bindings', () => {
      expect(domMatch(angularContent).attribute('[(ngModel)]').count()).toBe(1)
      expect(domMatch(angularContent).attribute('ngModel').count()).toBe(1)
    })

    it('matches Angular attributes with regex', () => {
      expect(domMatch(angularContent).attribute(/^\[.*\]$/).count()).toBe(3)
      expect(domMatch(angularContent).attribute(/^\(.*\)$/).count()).toBe(2)
    })
  })

  describe('multi-line tags', () => {
    it('matches tags spanning multiple lines', () => {
      expect(domMatch(multiLineContent).tag('Button').count()).toBe(1)
      expect(domMatch(multiLineContent).tag('Input').count()).toBe(1)
    })

    it('finds attributes in multi-line tags', () => {
      expect(
        domMatch(multiLineContent).tag('Button').attribute('variant', 'primary').count(),
      ).toBe(1)
      expect(
        domMatch(multiLineContent).tag('Button').attribute('disabled').count(),
      ).toBe(1)
    })

    it('chains attributes on multi-line tags', () => {
      expect(
        domMatch(multiLineContent)
          .tag('Button')
          .attribute('variant', 'primary')
          .attribute('size', 'lg')
          .attribute('disabled')
          .count(),
      ).toBe(1)
    })
  })

  describe('edge cases', () => {
    it('returns 0 on empty content', () => {
      expect(domMatch('').tag('div').count()).toBe(0)
      expect(domMatch('').attribute('class').count()).toBe(0)
    })

    it('returns 0 when no filters match', () => {
      expect(domMatch(htmlContent).tag('nonexistent').attribute('nope').count()).toBe(0)
    })

    it('count without any filter returns all opening tags', () => {
      const simple = '<a href="#"><b>text</b></a>'
      expect(domMatch(simple).count()).toBe(2)
    })

    it('immutable: reusing a partial chain does not leak state', () => {
      const base = domMatch(jsxContent).tag('LegacyButton')
      const withVariant = base.attribute('variant', 'primary')
      const withSize = base.attribute('size', 'lg')

      expect(withVariant.count()).toBe(1)
      expect(withSize.count()).toBe(1)
      expect(base.count()).toBe(1)
    })

    it('handles tags with no attributes', () => {
      const content = '<div></div><span></span>'
      expect(domMatch(content).tag('div').count()).toBe(1)
      expect(domMatch(content).attribute('class').count()).toBe(0)
    })

    it('does not hang on files with unclosed JSX expressions or long attribute lists', () => {
      // Regression test: the previous nested `(?:\s+(?:...)*)*` regex caused
      // catastrophic backtracking on content with unclosed `{` or dense whitespace.
      const pathological = `
        <Component prop={unclosedExpression someOtherProp="value"         
        <AnotherTag   a   b   c   d   e   f   g   h   i   j
        ${'   '.repeat(100)}<NoClose
      `
      const start = Date.now()
      const result = domMatch(pathological).count()
      const elapsed = Date.now() - start
      expect(result).toBe(0)
      expect(elapsed).toBeLessThan(500)
    })
  })
})
