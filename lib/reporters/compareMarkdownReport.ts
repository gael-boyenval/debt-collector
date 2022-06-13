const createTable = (data) => `
|File|Prev|Current|Trend|
|--|--|--|--|
${data
  .map((file) => `|${file.file}|${file.rev}|${file.current}|${file.trend}|`)
  .join('\n')}
`

const createFileTable = (fileResult) => `
<br/>
<br/>
<b>${fileResult.fileShortPath}</b><br/>
<br/>

|Broken rule|score|
|--|--|
${fileResult.brokenRules
  .map((rule) => `|🚫 ${rule.ruleTitle}|${rule.ruleTotalSore}|`)
  .join('\n')}
`

const getFileScoreComparaison = (data) => {
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

const getConclusions = (data) => {
  if (data.totalScores.solde > 0) {
    return `### ❌ Debt score for modified files increased by ${data.totalScores.solde} [^1]`
  }
  if (data.totalScores.solde < 0) {
    return `### ✅ Debt score for modified files decreased by ${data.totalScores.solde} [^1]`
  }

  return '### 💤 Debt score for modified files did not change [^1]'
}

const getMotivationSpeatch = (data) => {
  if (data.totalScores.solde > 0) {
    return `Maybe try something else 😭`
  }
  if (data.totalScores.solde < 0) {
    return `You did great ! 🎉`
  }

  return 'Neither good or bad, I guess 🤷🏽'
}

const compareMarkDownReport = (data) => `
## Debt collector report

${getConclusions(data)}
${getMotivationSpeatch(data)}

|Previous debt|Current debt|trend|
|--|--|--|
|${data.totalScores.rev.toString()}|${data.totalScores.cur.toString()}|${data.totalScores.solde.toString()}|

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

${data.currentResults
  .filter((res) => res.totalScore !== 0)
  .map(createFileTable)
  .join('\n')}

<br/>
<br/>
</div>
</details>

[^1]: Scores based on modified files only <br/>The report may not be accurate if your branch is not up to date with the base branch.
`

export default compareMarkDownReport
