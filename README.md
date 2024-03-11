/!\ Documentation is not up to date with v2-alpha... update comming soon

# debt-collector

A nodejs util to identify, track and mesure technical debt in a project.

Note that debt-collector is an alpha version and you should consider that bugs may occur and API may change without warnings.
As debt-collector is a tool that does not interfere with your code base, even buggy, it is relatively safe to use.
Considering the previous informations, we recomend to install a fixed version of debt-collector as of now.

## Install

### global :

`npm i -g debt-collector`

### local :

`npm i --save-dev debt-collector`

## How does it works ?

Debt collector has three main commands : `check`, `compare` and `walk`.

DC works by checking every files matching a `include` glob pattern, provided by a configuration file.
Each file is then checked for each rule defined in `fileRules`, for example :

```js
{
  include: '**/*.js',
  fileRules: [
    {
      title: 'Should remove all "foo" occurences',
      id: 'NO_FOO',
      debtScore: 2,
      matchRule: ({ findOne }) => findOne('foo'),
    },
  ]
}
```

In this exemple, for each javascript file within the current working directory,
we will check if we find the string `foo` within the file. Each time we encounter `foo` within a file, the debt score is incremented by 2 (`debtScore`).

## Commands

### commands common options

#### `--help`

display help

ex: `debt-collector [command] --help`

#### `--collect-from`, `-g`: **glob**

filters files by path

ex: `debt-collector [command] --collect-from="./src/**/*.scss"`
or `debt-collector [command] -g "./src/components/**/*.tsx"`

#### `--config`, `-c`: **string**

a path to DC config file

ex: `debt-collector [command] --config="./path/to/config"`
or `debt-collector [command] -c ./path/to/config`

## check command

`debt-collector check` or `npx debt-collector check`

this command will check all files and output a debt report, as well as a total score

### Available check option

the availables options are

#### `--rule`, `-r`: **string**

filter a specific rule (by ID)

ex: `debt-collector check --rule=FILE_TOO_LONG`
or `debt-collector check -r RULE_ID`

#### `--tags`, `-t`: **array**

filter rules by tags

ex: `debt-collector check --tags="design system" "forms" "styles"`
or `debt-collector check -t "design system" "forms" "styles"`

#### `--limit-top`: **number**

limit results to X files ordered by debt score

#### `--changed-since`, `-s`: **string**

filters only files that have changed since a git revision : local commit, branch or tag (make sure to be up to date)

ex: `debt-collector check --changed-since=master`
or `debt-collector check -s master`

this flag is usefull to give you a report for the current changes and can be used as a pre-push, or pre-commit hook, to inform you about actions you could take to reduce debt.

#### `--report-format`, `-f`: **string**

**filesOnly** list only files with debt scores

ex: `debt-collector check --report-format=filesOnly`
or `debt-collector check -f filesOnly`

**noMatchRules** list only rules that did not match anything

(useful to filter old rules or to identify bugged ones)

ex: `debt-collector check --report-format=noMatchRules`
or `debt-collector check -f noMatchRules`

**standard** default option, all files with every rules / scores

ex: `debt-collector check --report-format=standard`
or `debt-collector check -f standard`

## compare command

`debt-collector compare --revision [rev]` ou `npx debt-collector compare --revision [rev]`

This command will check every file that have changed since the revision (created, renamed, modified or deleted files) once for the revision, and one for the current HEAD and compare results to provide a compared results.

It will output files with no changes in bebt scores, files with less debt and files with more debt, as well as a total score comparaison.

Particularly usefull when creating a pull request, and we want to compare the main branch with the current pull request debt scores.

### Available compare option

#### `--rule`, `-r`: **string**

filter a specific rule (by ID)

ex: `debt-collector compare --rule=FILE_TOO_LONG`
or `debt-collector compare -r RULE_ID`

#### `--tags`, `-t`: **array**

filter rules by tags

ex: `debt-collector compare --tags="design system" "forms" "styles"`
or `debt-collector compare -t "design system" "forms" "styles"`

## walk command

`debt-collector walk` ou `npx debt-collector walk`

This command will check every releases tags and run a diagnostic.

It will then output a HTML report with a detailled graph and will try to open it in the browser.
If the openning fails, the report will be saved in `node_modules/.cache/debt-collector/report.html`

/!\ please note that for now, the walk command should only work in the context of the the passculture project (for wich this library was initialy created), but a configuration should be added in the future to allow you to check any revisions you want (tags or commits) with fine controls.

### Available walk options

#### `--revlength`, `-n`: **number**

limit the number of revision to check

ex: `debt-collector walk --revlength=10`
or `debt-collector walk -n 10`

## Configuration

By default DC will look for a configuration file in the current working directory : `./debt-collector.config.js`

### Configs keys

```js
{
  include: './src/**/*', // glob pattern for the files to track,
  fileRules: [...], // an array of rules checking file content,
  eslintConfigPath: './path/to/myEslintConfig.js', // a path to an eslint config to check for eslint rules
  eslintRules: [...] // an array of rules checking for eslint output results
}
```

## Configuring FileRules :

An array of objects containing the following keys :

- `title` [required]: string
- `id` [required]: string (SNAKE_CASE by convention)
- `debtScore` [required]: a integer that will increment for each match
- `description` [optional]: a string to give more detailed information about the rule
- `tags` [optional]: an array of strings, usefull to filter or create rules groups
- `include` [optional]: glob pattern : for applying the rule only if the file match the a glob pattern
- `matchRule` [optional]: a function returing the number of occurences found in the file

To be valid, a fileRule should have at least a `include` or a `matchRule` or **both**.

### the include key

Given the following config :

```js
{
  include: './src/**/*',
  fileRules: [
    {
      title: 'should migrate javascript files to typescript',
      id: 'JS_TO_TS',
      debtScore: 5,
      include: '**/*.{js,jsx}',
    }
  ],
}
```

DC will increment the debt score by 5 every time it encounter a js or a jsx file within the `src` directory.

### The matchRule function

The match rule function should return a number, corresponding to the number of occurences found in the file, for exemple, given a file with the folowing content :

```
foo bar foo foo
```

And the following config :

```js
{
  include: './src/**/*',
  fileRules: [
    {
      title: 'should migrate javascript files to typescript',
      id: 'JS_TO_TS',
      debtScore: 2,
      matchRule:({ findOne }) => findOne('foo'),
    }
  ],
}
```

The file would have a score of 6 ( 3 occurences of 'foo' \* debtScore )

`({findOne}) => findOne('foo') + findOne('bar')` would give you a score of 8

#### The matchRule function

DC provide the `matchRule` function with a parameter object of usefull things :

```ts
type MatchRule = ({
  content: string,
  file: string,
  findOne(string | Regex): 0 | 1,
  countAll(string | Regex): number,
  findOneOf((string | Regex)[]):  0 | 1,
  countAllOf((string | Regex)[]): number,
  findJsImportFrom(string, string): 0 | 1,
}) => number
```

examples :

`findJsImportFrom('foo', 'bar')` will matches `import foo from 'bar'` or `import { foo, baz } from '@tata/bar'` etc...

`countAll(/[^.]map\(/g)` will match all occurences of `map(() => {})` that are not preceded by a `.`

`findOneOf(['toto', 'tutu', /tata/g])` will return 1 if the file contain any occurence of `toto`, `tutu` or `tata`

`countAllOf(['toto', 'tutu', /tata/g])` will return the number of occurences of `toto`, `tutu` and `tata` in a file

### using both matchRule and include

By using both matchRule and include, your score will only increment if the file match the glob **and** the rule.

## Configuring Eslint rules

To configure eslint checks on files, provide the following keys in the configuration file :

```js
{
  eslintConfigPath: './path/to/myEslintConfig.js', // a path to an eslint config to check for eslint rules
  eslintRules: [...] // an array of rules checking for eslint output results
}
```

### eslintRules array

You should provide the same keys for eslint rules than for fileRules, exept for the `eslintRules` key :

- `title` [required]: string
- `id` [required]: string (SNAKE_CASE by convention)
- `debtScore` [required]: a integer that will increment for each match
- `description` [optional]: a string to give more detailed information about the rule
- `tags` [optional]: an array of strings, usefull to filter or create rules groups
- `include` [optional]: glob pattern or an array of glob patterns: for applying the rule only if the file match
- `matchESLintRule` [optional]: a function returing the number of occurences found in eslint output

#### The matchESLintRule function :

DC provide the `matchESLintRule` function with an object of usefull things passed as param :

- `results`: a javascript object containing the eslint output result for the file
- `file`: the relative file path (ex: './src/components/Button/Button.tsx')
- `containRuleIdMessage`: an utility than return the number of error or warning from a specific rule
- `containMessageFromPlugin`: an utility than return the number of error or warning from a particular plugin

The `matchESLintRule` function should return an integer
