---
description: >-
  Generate an interactive graph report of your debt évolution through time and
  space.
---

# The Walk command

```
debt-collector walk
```

{% hint style="info" %}
The walk command require a specific configuration in order to work. See configuring for more informations
{% endhint %}

The walk command works like compare, but instead of comparing 2 revisions, it will walk throught commits in time and analyse changes in order to see the évolution of debt through time. It will generate an HTML file report under&#x20;

```
node_modules/.cache/debt-collector/report.html
```

This command is designed to be run on your base branch, either triggered by a cron or when releasing new software version.&#x20;

{% hint style="warning" %}
In order for the walk command to work, and depending on your configuration, make sure you have all git history on the target branch.&#x20;
{% endhint %}



### Configuration overview

More information will be provided in the configuration section of thius documentation, but here are the basics :&#x20;

#### The typescript signature for the walk config

```typescript
interface Config {
  ...
  walkConfig?: {
    gitCommand: string // a git command to be run
    parser: (gitResult: string) => string[] // a funtion parsing the result, and returning a list of revisions
    limit?: number // the maximum number of revision that should be analyzed
    report?: // see the config docs for more infos on that
  }
  ...
}
```





