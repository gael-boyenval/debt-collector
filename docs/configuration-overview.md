---
description: How to configure Debt-collector
---

# Configuration overview

By default DC will look for a configuration file in the current working directory :&#x20;

```
./debt-collector.config.js
```

Every command allow you to ovveride this behavior using the `--config` or `-c` flag followed by the path of your configuration

**Example :**&#x20;

```shell
debt-collector check --config ./configs/debt-collector.js
```

### Configuration basics :&#x20;

```typescript
type Config = () : {
  includes: string | string[]; // a glob or an array of glob
  fileRules: {
    id: string; // the rule identifier
    title: string; // a descriptive title for the rule
  }[]
}
```

