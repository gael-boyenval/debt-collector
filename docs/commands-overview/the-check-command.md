---
description: Run a check on all your project files, with filtering and reporting options
---

# The Check command

```shell
debt-collector check
```

### Optional flags :&#x20;

| flag                          | argument                                                  | description                                                                             |
| ----------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **`--rule / -r`**             | `string`: a rule Id                                       | display results for one specific rule                                                   |
| **`--tags / -t`**             | `array`: a list of tags                                   | filter results by rule tags                                                             |
| **`--include / -g`**          | `string`: a glob pattern                                  | override the include configuration                                                      |
| **`--limit-top / -l`**        | `number`                                                  | only show X files, ordered by score                                                     |
| **`--changed-since / -s`**    | `string` : a git revision                                 | show score only for files with diffs between the current branch and the target revision  |
| **`--report-format / -f`**    | `string:` `'standard'`, `'filesOnly'`, or `'noMatchRules'` | change the output format                                                                |
| **`--config / -c`**           | `string`: path to the config file                         | change the default config path                                                          |
| **`--help`**                  |                                                           | display help for command                                                                |

### Report formats

- **`standard`** (default): Full report with all rules and files
- **`filesOnly`**: Only list files with their total score
- **`noMatchRules`**: Show results without individual match details
