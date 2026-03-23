---
description: How to configure Debt-collector
---

# Configuration overview

By default, Debt Collector will look for a configuration file in the current working directory:


```
./debt-collector.config.js
```

Every command allows you to override this behavior using the `--config` or `-c` flag followed by the path to your configuration file.

**Example:**

```shell
debt-collector check --config ./configs/debt-collector.js
```

{% hint style="info" %}
The config file is loaded via dynamic `import()`. If your project uses `"type": "module"` in `package.json`, use `export default`. Otherwise, `module.exports` also works.
{% endhint %}

## Configuration Structure

The configuration file should export a JavaScript object with the following structure:

```typescript
type Config = {
  // A name for your project
  projectName: string;

  // Glob patterns for files to analyze (must be an array)
  include: string[];
  
  // Optional glob patterns for files to exclude
  exclude?: string[];

  // Exclude files listed in .gitignore (default: true)
  useGitIgnore?: boolean;
  
  // Rules to detect technical debt in files
  fileRules: FileRule[];

  // Optional rules to track adoption/migration progress
  adoptionRules?: FileRule[];

  // Optional metric pairings to track adoption vs debt
  trackAdoptionMetrics?: {
    label: string;
    id: string;
    debtRules: string[];      // IDs of file rules
    adoptionRules: string[];  // IDs of adoption rules
  }[];
  
  // Optional walk command configuration
  walkConfig?: {
    gitCommand: string;
    parser: (gitResult: string) => { hash: string; name: string; date: string }[];
    limit?: number;
    report?: {
      packages?: { [name: string]: string };
    };
  };
}
```

## File Rules

File rules are used to analyze file contents and identify patterns of technical debt. Each rule can have:

1. **Basic Properties**:
   - `id`: Unique identifier in SNAKE_CASE (e.g., `NO_FOO_VARIABLES`)
   - `title`: Human-readable description
   - `debtScore`: Number of points to add for each match
   - `description`: Optional detailed explanation
   - `howTo`: Optional instructions on how to fix the issue
   - `startTrackingDate`: Optional date string to track when monitoring of this rule began

2. **File Filtering**:
   - `include`: Glob patterns for files to check (string or array)
   - `exclude`: Glob patterns for files to ignore (string or array)
   - `tags`: Categories for filtering rules (string or array)

3. **Matching Logic**:
   The `matchRule` function receives a utilities object with the following shape:

   ```typescript
   type DomFilter = string | string[] | RegExp

   type DomMatchChain = {
     tag: (filter: DomFilter) => DomMatchChain;
     attribute: (name: DomFilter, value?: DomFilter) => DomMatchChain;
     count: () => number;
     find: () => 0 | 1;
   }

   type MatchRuleUtils = {
     content: string;
     file: string;
     findOne: (pattern: string | RegExp) => 0 | 1;
     countAll: (pattern: string | RegExp) => number;
     findOneOf: (patterns: (string | RegExp)[]) => 0 | 1;
     countAllOf: (patterns: (string | RegExp)[]) => number;
     findJsImportFrom: (importName?: string, from?: string) => 0 | 1;
     findAttributesInTag: (attributes?: string | string[], tagName?: string) => 0 | 1;
     domMatch: DomMatchChain;
   }
   ```

{% hint style="info" %}
If `matchRule` is omitted and `include` is set, the rule counts 1 for each matching file. This is useful for rules like "migrate all `.css` files to `.scss`".
{% endhint %}

## Adoption Rules

Adoption rules have the same structure as file rules, but serve the opposite purpose: they track **positive progress** such as migration to new patterns or adoption of new standards.

Key differences from file rules:
- Adoption rules do **not** contribute to the `totalScore` of a file
- Adoption rules are **not** filtered by per-rule `include`/`exclude` path patterns — they are evaluated against all files in the file list
- Adoption rules are **not** affected by `--rule` or `--tags` CLI filters

```javascript
export default {
  projectName: 'my-project',
  include: ['./src/**/*'],
  fileRules: [
    {
      id: 'MIGRATE_CSS_TO_SCSS',
      title: 'Use SCSS instead of CSS',
      debtScore: 5,
      include: ['**/*.css'],
    }
  ],
  adoptionRules: [
    {
      id: 'SCSS_ADOPTED',
      title: 'SCSS files adopted',
      debtScore: 1,
      include: ['**/*.scss'],
    }
  ]
}
```

## Track Adoption Metrics

`trackAdoptionMetrics` lets you pair debt rules with adoption rules to measure migration progress over time. Each entry links a set of debt rules to a set of adoption rules under a common label.

```javascript
export default {
  projectName: 'my-project',
  include: ['./src/**/*'],
  fileRules: [/* ... */],
  adoptionRules: [/* ... */],
  trackAdoptionMetrics: [
    {
      id: 'css-to-scss',
      label: 'CSS to SCSS migration',
      debtRules: ['MIGRATE_CSS_TO_SCSS'],
      adoptionRules: ['SCSS_ADOPTED'],
    }
  ]
}
```

## Examples

### Basic Configuration

```javascript
export default {
  projectName: 'my-project',
  include: ['./src/**/*'],
  fileRules: [
    {
      id: 'REMOVE_FOO',
      title: 'Remove all "foo" occurrences',
      debtScore: 3,
      matchRule: ({ countAll }) => countAll('foo'),
    },
    {
      id: 'MIGRATE_CSS_TO_SCSS',
      title: 'Use SCSS instead of CSS',
      debtScore: 5,
      include: ['**/*.css'],
    }
  ]
}
```

### Walk Command Configuration

```javascript
export default {
  projectName: 'my-project',
  include: ['./src/**/*'],
  fileRules: [/* ... */],
  walkConfig: {
    gitCommand: 'git tag --list "v*"',
    parser: (output) => output.split('\n').filter(Boolean).map(name => ({
      hash: name,
      name,
      date: new Date().toISOString(),
    })),
    limit: 10,
  }
}
```

## Gitignore Integration

By default, Debt Collector automatically excludes files listed in your project's `.gitignore` file. This means files like `node_modules/`, `dist/`, build artifacts, and other gitignored paths are skipped without needing to add them to `exclude`.

If you need to disable this behavior (for example, to analyze generated files), set `useGitIgnore` to `false`:

```javascript
export default {
  projectName: 'my-project',
  include: ['./src/**/*'],
  useGitIgnore: false,
  fileRules: [/* ... */]
}
```

## Best Practices

1. **Rule IDs**: Use descriptive, uppercase SNAKE_CASE identifiers
2. **Debt Scores**: Use consistent scoring based on impact and effort
3. **File Patterns**: Be specific with include/exclude patterns
4. **Tags**: Use meaningful categories for better organization
5. **Descriptions**: Provide clear explanations and fix instructions
6. **Testing**: Test rules with various file types and content
7. **Maintenance**: Review and update rules periodically

## Common Patterns

### Finding Specific Code Patterns

```javascript
{
  id: 'NO_IMPORT_FOO',
  title: 'Remove imports from "foo" package',
  debtScore: 2,
  matchRule: ({ findJsImportFrom }) => findJsImportFrom('*', 'foo')
}
```

### Counting Multiple Patterns

```javascript
{
  id: 'NO_LEGACY_SYNTAX',
  title: 'Remove legacy syntax usage',
  debtScore: 3,
  matchRule: ({ countAllOf }) => 
    countAllOf(['var ', 'function(', '=> {'])
}
```

### Complex Pattern Matching

```javascript
{
  id: 'NO_NESTED_CALLBACKS',
  title: 'Avoid deeply nested callbacks',
  debtScore: 5,
  matchRule: ({ countAll }) => 
    countAll(/\.then\([^)]*\.then\([^)]*\.then\(/g)
}
```

### Finding Attributes in Tags

```javascript
{
  id: 'NO_INLINE_ONCLICK',
  title: 'Remove inline onclick handlers',
  debtScore: 3,
  matchRule: ({ findAttributesInTag }) => findAttributesInTag('onclick')
}
```

```javascript
{
  id: 'NO_TABLE_BORDER',
  title: 'Remove border attribute from tables',
  debtScore: 2,
  matchRule: ({ findAttributesInTag }) => findAttributesInTag('border', 'table')
}
```

### DOM-like Markup Matching with `domMatch`

`domMatch` is a chainable utility for querying DOM-like markup. It works with HTML, JSX, TSX, Vue templates, Angular templates, and any similar syntax. All filter positions accept `string`, `string[]` (OR logic), or `RegExp`.

#### Counting tags

```javascript
{
  id: 'NO_LEGACY_COMPONENTS',
  title: 'Remove usage of Legacy* components',
  debtScore: 5,
  include: ['**/*.tsx'],
  matchRule: ({ domMatch }) => domMatch.tag(/^Legacy/).count()
}
```

#### Finding attributes in specific tags

```javascript
{
  id: 'NO_INLINE_STYLE',
  title: 'Avoid inline styles on div and span',
  debtScore: 2,
  matchRule: ({ domMatch }) =>
    domMatch.tag(['div', 'span']).attribute('style').count()
}
```

#### Matching attribute values

```javascript
{
  id: 'NO_PRIMARY_VARIANT',
  title: 'Migrate Button variant="primary" to "brand"',
  debtScore: 3,
  matchRule: ({ domMatch }) =>
    domMatch.tag('Button').attribute('variant', 'primary').count()
}
```

#### Multiple attribute filters (AND logic)

```javascript
{
  id: 'NO_DISABLED_REQUIRED_INPUT',
  title: 'Inputs should not be both disabled and required',
  debtScore: 4,
  matchRule: ({ domMatch }) =>
    domMatch.tag('input').attribute('disabled').attribute('required').count()
}
```

#### Standalone attribute matching (any tag)

```javascript
{
  id: 'NO_DATA_TEST_ATTRS',
  title: 'Remove data-test attributes before production',
  debtScore: 1,
  matchRule: ({ domMatch }) => domMatch.attribute(/^data-test/).count()
}
```

#### Vue directives and Angular bindings

```javascript
// Vue: find components using v-html
{
  id: 'NO_V_HTML',
  title: 'Avoid v-html for XSS safety',
  debtScore: 8,
  matchRule: ({ domMatch }) => domMatch.attribute('v-html').count()
}

// Angular: find two-way bindings
{
  id: 'AUDIT_NG_MODEL',
  title: 'Audit all ngModel two-way bindings',
  debtScore: 1,
  matchRule: ({ domMatch }) => domMatch.attribute('[(ngModel)]').count()
}
```
