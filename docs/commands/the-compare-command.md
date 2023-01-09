---
description: >-
  Compare 2 git revisions against each other and see the évolution of your debt
  between them
---

# The Compare command

```shell
debt-collector compare --revision {GIT_REV}
```

where `GIT_REV` is a hash, commit, or a branch where Git is able to checkout onto

{% hint style="info" %}
This command is useful (and has been thought to do so) to publish Pull request reports. It's mostly designed to run in a CI environment, but you can run it from anywhere
{% endhint %}

{% hint style="danger" %}
**DO NOT ABORT EXECUTION :** \
****As Debt Collector will checkout during the execution of this command, you may find yourself in a different git state if you do not let Debt collector run the commnd until completion.&#x20;
{% endhint %}

#### Example :&#x20;

```
debt-collector compare --revision main
```

In this case, debt-collector will compare the "Main" branch with the current head.&#x20;

{% hint style="warning" %}
Debt-collector require you to have a clean history in order to run this command. All changes need to be committed to the current head. \
The revision argument should point to an ancestor of the current head. \
Make sure your local git history is up to date.
{% endhint %}

The compare command will first check the Main branch, then analyse Diff between the ancestor and current head. And then report for every modified files, the debt score évolution, and provide hints on how to reduce the debt further.&#x20;



### Optional flags :&#x20;

| flag              | argument                | action                                |
| ----------------- | ----------------------- | ------------------------------------- |
| **`--rule / -r`** | `string`: a rule Id     | display results for one specific rule |
| **`--tags / -t`** | `array`: a list of tags | filter results by rule tags           |
| **`--help`**      |                         | display help                          |

