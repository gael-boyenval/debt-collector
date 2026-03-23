---
description: >-
  Generate an interactive graph report of your debt evolution through time and
  space.
---

# The Walk command

```
debt-collector walk
```

{% hint style="info" %}
The walk command requires a specific configuration in order to work. See the [configuration overview](../configuration-overview.md) for more information.
{% endhint %}

The walk command works like compare, but instead of comparing 2 revisions, it will walk through commits in time and analyse changes in order to see the evolution of debt through time. It will generate an HTML file report under&#x20;

```
node_modules/.cache/debt-collector/report.html
```

This command is designed to be run on your base branch, either triggered by a cron or when releasing new software version.&#x20;

{% hint style="warning" %}
In order for the walk command to work, and depending on your configuration, make sure you have all git history on the target branch.&#x20;
{% endhint %}

{% hint style="danger" %}
**DO NOT ABORT EXECUTION :** \
****As Debt Collector will checkout multiple times during the execution of this command, you may find yourself in a different git state if you do not let Debt collector run the command until completion.&#x20;
{% endhint %}



### Configuration overview

More information is provided in the [configuration section](../configuration-overview.md) of this documentation, but here are the basics :&#x20;

#### The typescript signature for the walk config

```typescript
interface Config {
  ...
  walkConfig?: {
    gitCommand: string
    parser: (gitResult: string) => { hash: string; date: string; name: string }[]
    limit?: number
    report?: {
      packages?: { [name: string]: string }
    }
  }
  ...
}
```



| flag                    | argument                          | description                    |
| ----------------------- | --------------------------------- | ------------------------------ |
| **`--open-report / -o`** | `boolean`                        | open the report in the browser |
| **`--config / -c`**     | `string`: path to the config file | change the default config path |
| **`--help`**            |                                   | display help for the command   |
