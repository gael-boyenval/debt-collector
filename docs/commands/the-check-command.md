---
description: Run a check on all your project files, with filtering and reporting options
---

# The Check command

```shell
debt-collector check
```

### Optional flags :&#x20;

| flag                       | argument                           | action                                                                                  |
| -------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------- |
| **`--rule / -r`**          | `string`: a rule Id                | display results for one specific rule                                                   |
| **`--tags / -t`**          | `array`: a list of tags            | filter results by rule tags                                                             |
| **`--limit-top`**          | `number`                           | only show X files, ordered by score                                                     |
| **`--changed-since`**      | `string` : a git revision          | show score only for files with diffs between the current branch and the target revision |
| **`--report-format / -f`** | `string:` 'filesOnly' , 'standard' | change the output format                                                                |
| **`--help`**               |                                    | display help for command                                                                |



