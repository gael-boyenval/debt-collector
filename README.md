# debt-collector
A nodejs util to identify, track and mesure technical debt in a project

## Install

Note that debt-collector is an alpha version and is not yet available trough the NPM registry. 

### global :

`npm i -g https://github.com/gael-boyenval/debt-collector`

### local :

`npm i --save-dev https://github.com/gael-boyenval/debt-collector`

## How does it works ?

Debt collector as two comands : `check` and `compare`. 

DC works by checking every files matching a `collectFrom` glob pattern, provided by a configuration file.
Each file is then checked for each rule defined in `fileRules`, for example : 

```js
{
  collectFrom: '**/*.js',
  fileRules: [
    {
      title: 'Should remove all "foo" occurences',
      id: 'NO_FOO',
      debtScore: 2,
      matchRule: ({ find }) => find('foo'),
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

#### `--version`

display version

ex: `debt-collector [command] --collect-from="./src/**/*.scss"`
or `debt-collector [command] -g "./src/components/**/*.tsx"`


#### `--collect-from`, `-g`: **glob**

filters files by path 

ex: `debt-collector [command] --collect-from="./src/**/*.scss"`
or `debt-collector [command] -g "./src/components/**/*.tsx"`

#### `--rule`, `-r`: **string**

filter a specific rule (by ID) 

ex: `debt-collector [command] --rule=FILE_TOO_LONG` 
or `debt-collector [command] -r RULE_ID`

#### `--tags`, `-t`: **array**

filter rules by tags 

ex: `debt-collector [command] --tags=forms styles`
or `debt-collector [command] -t forms styles`

#### `--config`, `-c`: **string**

a path to DC config file

ex: `debt-collector [command] --config="./path/to/config"`
or `debt-collector [command] -c ./path/to/config`

### check command

`debt-collector check` or `npx debt-collector check`

this command will check all files and output a debt report, as well as a total score

#### Available check option

the availables options are

#### `--limit-top`: **number**

limit results to X files ordered by debt score

#### `--changed-since`, `-s`: **string**

filters only files that have changed since a git revision : local commit, branch or tag (make sure to be up to date)

ex: `debt-collector check --changed-since=master`
or `debt-collector check -s master`

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

### compare command

`debt-collector compare --revision [rev]` ou `npx debt-collector compare --revision [rev]`

This command will check every file that have changed since the revision (created, renamed, modified or deleted files) once for the revision, and one for the current HEAD and compare results to provide a compared results. 

It will output files with no changes in bebt scores, files with less debt and files with more debt, as well as a totalm score comparaison.

Particularly usefull when creating a pull request, and we want to compare the main branch with the current pull request debt scores.

## Configuration

By default DC will look for a configuration file in the current working directory : `./debt-collector.config.js`

### Configs keys

```js
{
  collectFrom: './src/**/*', // glob pattern for the files to track,
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
- `matchGlob` [optional]: glob pattern : for applying the rule only if the file match the a glob pattern
- `matchRule` [optional]: a function returing the number of occurences found in the file

To be valid, a fileRule should have at least a `matchGlob` or a `matchRule` or **both**.

### the matchGlob key

Given the following config : 

```js
{
  collectFrom: './src/**/*',
  fileRules: [
    {
      title: 'should migrate javascript files to typescript',
      id: 'JS_TO_TS',
      debtScore: 5,
      matchGlob: '**/*.{js,jsx}',
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
  collectFrom: './src/**/*',
  fileRules: [
    {
      title: 'should migrate javascript files to typescript',
      id: 'JS_TO_TS',
      debtScore: 2,
      matchRule:({ find }) => find('foo'),
    }
  ],
}
```

The file would have a score of 6 ( 3 occurences of 'foo' * debtScore )

`({find}) => find('foo') + find('bar')` would give you a score of 8

#### The matchRule function

DC provide the `matchRule` function with an object of usefull things :

- `content` : the strigified content of the file
- `file` : the relative file path (ex: './src/components/Button/Button.tsx')
- `find` : an utility than return the number of occurences of a string in the file

The `matchRule` function should return an integer

### using both matchRule and matchGlob

By using both matchRule and matchGlob, your score will only increment if the file match the glob **and** the rule. 


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
- `matchGlob` [optional]: glob pattern or an array of glob patterns: for applying the rule only if the file match
- `matchESLintRule` [optional]: a function returing the number of occurences found in eslint output

#### The matchESLintRule function : 

DC provide the `matchESLintRule` function with an object of usefull things passed as param :

- `results`: a javascript object containing the eslint output result for the file
- `file`: the relative file path (ex: './src/components/Button/Button.tsx')
- `containRuleIdMessage`: an utility than return the number of error or warning from a specific rule
- `containMessageFromPlugin`: an utility than return the number of error or warning from a particular plugin

The `matchESLintRule` function should return an integer
