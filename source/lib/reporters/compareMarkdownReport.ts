import type { CompareResults, FileComparison, FileResults } from '../types.ts'

const createTable = (data: FileComparison[]) => `
|File|Prev|Current|Trend|
|--|--|--|--|
${data
  .map((file) => `|${file.file}|${file.rev}|${file.current}|${file.trend}|`)
  .join('\n')}
`

const createFileTable = (fileResult: FileResults) => `
<br/>
<br/>
<b>${fileResult?.fileShortPath ?? fileResult?.filePath ?? 'unknown path'}</b><br/>
<br/>

|Broken rule|score|
|--|--|
${fileResult.brokenRules
  .map((rule) => `|🚫 ${rule.ruleTitle}|${rule.ruleTotalSore}|`)
  .join('\n')}
`

const getFileScoreComparaison = (data: CompareResults) => {
  let result = ''
  if (data.noChangesFiles.length > 0) {
    result += `
### 💤 Files with same debt :

${createTable(data.noChangesFiles)}

`
  }

  if (data.lessDeptFiles.length > 0) {
    result += `
### ✅ Files with less debt :

${createTable(data.lessDeptFiles)}

`
  }

  if (data.moreDeptFiles.length > 0) {
    result += `
### ❌ Files with more debt :

${createTable(data.moreDeptFiles)}

`
  }

  return result
}

const getConclusions = (solde: number) => {
  if (solde > 0) {
    return `### ❌ Debt score for modified files increased by ${solde} [^1]`
  }
  if (solde < 0) {
    return `### ✅ Debt score for modified files decreased by ${solde} [^1]`
  }

  return '### 💤 Debt score for modified files did not change [^1]'
}

const getMotivationSpeatch = (solde: number) => {
  if (solde > 0) {
    return `Maybe try something else 😭`
  }
  if (solde < 0) {
    return `You did great ! 🎉`
  }

  return 'Neither good or bad, I guess 🤷🏽'
}

const compareMarkDownReport = (data: CompareResults) => {
  const solde =
    data.currentRevResult.totalScore - data.previousRevResult.totalScore
  return data.previousRevResult.totalScore === 0 &&
    data.currentRevResult.totalScore === 0
    ? `
## Debt collector report

All changed files have a debt score of 0.

Nothing to do here, we're all good ! 🎉
`
    : `
## Debt collector report

${getConclusions(solde)}
${getMotivationSpeatch(solde)}

|Previous debt|Current debt|trend|
|--|--|--|
|${data.previousRevResult.totalScore.toString()}|${data.currentRevResult.totalScore.toString()}|${solde.toString()}|

<details>
<summary>
  <h3>Modified files • see scores before and after</h3>
</summary>
<div>

${getFileScoreComparaison(data)}

<br/>
<br/>
</div>
</details>


<details>
<summary>
  <h3>Help us improve code quality! Here are some ideas for you</h3>
</summary>
<div>

${data.currentRevResult.results
  ?.filter((rule) => rule.totalScore !== 0)
  .map((rule) => createFileTable(rule))
  .join('\n')}

<br/>
<br/>
</div>
</details>

[^1]: Scores based on modified files only <br/>The report may not be accurate if your branch is not up to date with the base branch.
`
}

export default compareMarkDownReport
