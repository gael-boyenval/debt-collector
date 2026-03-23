---
description: Test your walk configuration without running a full analysis
---

# The WalkDryRun command

```shell
debt-collector walkdryrun
```

The `walkdryrun` command lets you test your `walkConfig` without actually walking through revisions and analyzing files. It runs the configured `gitCommand`, applies your `parser`, and displays the parsed results so you can verify that your walk configuration is correct before committing to a full walk.

{% hint style="info" %}
This command requires a `walkConfig` in your configuration file, just like the `walk` command. See the [configuration overview](../configuration-overview.md) for more information.
{% endhint %}

### What it does

1. Loads and validates your configuration
2. Executes the `gitCommand` from your `walkConfig`
3. Runs the `parser` function on the raw output
4. Displays a truncated version of the raw command output
5. Displays the parsed revision list (limited by `walkConfig.limit`, defaulting to 10)

This is useful for debugging your `gitCommand` and `parser` before running a potentially long `walk` analysis.

### Optional flags :&#x20;

| flag                    | argument                          | description                              |
| ----------------------- | --------------------------------- | ---------------------------------------- |
| **`--config / -c`**     | `string`: path to the config file | change the default config path           |
| **`--include / -g`**    | `string`: a glob pattern          | override the include configuration       |
| **`--open-report / -o`**| `boolean`                         | open the report in the browser           |
| **`--help`**            |                                   | display help for the command             |
