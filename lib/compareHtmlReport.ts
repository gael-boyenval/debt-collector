const createTable = (data) => `
|File|Prev|Current|trend|
|--|--|--|--|
${data.map(file => `|${file.file}|${file.rev}|${file.current}|${file.trend}|`).join('\n')}
`

const compareHtmlReport = (data) => `
## Debt collector report:

${data.noChangesFiles.length > 0 ? `
<h3 color="#999">Files with same debt :</h3>

${createTable(data.noChangesFiles)}
`: null}

${data.lessDeptFiles.length > 0 ? `
<h3 color="green">Files with less debt </h3>

${createTable(data.lessDeptFiles)}
`: null}

${data.moreDeptFiles.length > 0 ? `
<h3 color="red">Files with more debt </h3>

${createTable(data.moreDeptFiles)}
`: null}
</br>

##### Previous debt : ${data.totalScores.rev.toString()}
##### Current debt : ${data.totalScores.cur.toString()}

<h2 color="${data.resultColor(data.totalScores.solde)}">
  Debt ${data.totalScores.solde > 0 ? 'increased' : 'decreased'} by ${data.totalScores.solde.toString()} Points
</h2>

<p>To get a file by file report, please run debt-collector check --changed-since="[REVISION]"</p>
`

export default compareHtmlReport