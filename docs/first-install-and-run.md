---
description: How to install and run your first analysis
---

# First install and run

### Requirements

* having node-js installed (tested with node 16 and 18 but probably working fine with other versions)

### Install Debt-collector in your project

```shell
npm i debt-collector -D
yarn add -D debt-collector
```

{% hint style="warning" %}
As long as debt-collector is an `alpha` version, **we recommend you to lock the package version number**. Breaking changes (including bugs or api changes) may occur without warnings.\
As Debt-collector is not messing with your production code, it's pretty safe to use even as an Alpha version though. \
\
Long story short : **Use it but lock the version** ! 🥰
{% endhint %}

```shell
npm i debt-collector@1.0.0-alpha.5 -D
yarn add -D debt-collector@1.0.0-alpha.5
```

### Create a configuration file

Create a configuration file named `debt-collector.config.js` in your project's root directory

then add the following content :

```javascript
module.exports = {
  include: './src/**/*',
  fileRules: [
    {
      id: 'REMOVE_FOO',
      title: 'we should get rid of all "Foo" occurences'
      debtScore: 3,
      matchRule: ({ countAll }) => countAll('foo'),
    }, {
      id: 'MIGRATE_CSS_TO_SCSS',
      title: 'use scss instead of css'
      debtScore: 5,
      include: '**/*.css'
    }
  ]
}
```

#### What we've done here :&#x20;

* defined that debt-collector should track all files contained in the `src` directory
* created two file rules :&#x20;
  * the first one will monitor for every occurences of "foo" in every files and increment your debt score of 3 points for every occurences
  * the second will count all css files, and increment your debt score of 5 points for every matches

### Add a script to your package.json

```json
"scripts": {
   "debt:check": "debt-collector check"
}
```

### Let’s try it :&#x20;

Open your command line and run :

```shell
npm run debt:check
yarn debt:check
```

That's it, you've installed debt-collector and created your first rules. \
But debt-collector is a lot more than a glorified search engine.&#x20;

