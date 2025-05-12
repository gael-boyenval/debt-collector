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

## Configuration Structure

The configuration file should export a JavaScript object with the following structure:

```typescript
type Config = {
  // Glob patterns for files to analyze
  includes: string | string[];
  
  // Optional glob patterns for files to exclude
  excludes?: string | string[];
  
  // Rules to check in files
  fileRules: {
    // Required fields
    id: string;        // Unique identifier in SNAKE_CASE
    title: string;     // Human-readable description
    debtScore: number; // Score to add for each match
    
    // Optional fields
    description?: string;     // Detailed explanation of the rule
    howTo?: string;          // Instructions on how to fix the issue
    include?: string | string[]; // Rule-specific file patterns
    exclude?: string | string[]; // Rule-specific file exclusions
    tags?: string | string[];    // Categories for filtering rules
    matchRule?: (context: MatchRuleContext) => number; // Rule matching logic
  }[];
  
  // Optional walk command configuration
  walkConfig?: {
    gitCommand: string;  // Git command to get revisions
    parser: (gitResult: string) => {hash: string; name: string; date: string}[];  // Parse git command output
    limit?: number;  // Maximum number of revisions to analyze
    report?: {
      // Report configuration options
    };
  };
}
```

## Rule Types

### File Rules

File rules are used to analyze file contents and identify patterns. Each rule can have:

1. **Basic Properties**:
   - `id`: Unique identifier in SNAKE_CASE (e.g., `NO_FOO_VARIABLES`)
   - `title`: Human-readable description
   - `debtScore`: Number of points to add for each match
   - `description`: Optional detailed explanation
   - `howTo`: Optional instructions on how to fix the issue

2. **File Filtering**:
   - `include`: Glob patterns for files to check
   - `exclude`: Glob patterns for files to ignore
   - `tags`: Categories for filtering rules

3. **Matching Logic**:
   The `matchRule` function receives a context object with utilities:

   ```typescript
   type MatchRuleContext = {
     content: string;        // File contents
     file: string;          // File path
     findOne: (pattern: string | RegExp) => 0 | 1;
     countAll: (pattern: string | RegExp) => number;
     findOneOf: (patterns: (string | RegExp)[]) => 0 | 1;
     countAllOf: (patterns: (string | RegExp)[]) => number;
     findJsImportFrom: (importName: string, from: string) => 0 | 1;
   }
   ```

## Examples

### Basic Configuration

```javascript
module.exports = {
  includes: './src/**/*',
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
      include: '**/*.css' // will count 1 for each file found
    }
  ]
}
```

### Walk Command Configuration

```javascript
module.exports = {
  includes: './src/**/*',
  fileRules: [/* ... */],
  walkConfig: {
    gitCommand: 'git tag --list "v*"',
    parser: (output) => output.split('\n').filter(Boolean),
    limit: 10
  }
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

