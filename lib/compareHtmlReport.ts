const createTable = (data) => `
<table>
  <thead>
    <tr>
      <th>File</th>
      <th>Prev</th>
      <th>Current</th>
      <th>trend</th>
    </tr>
  </thead>
  <tbody>
    ${data.map(file => `
      <tr>
        <td>${file.file}</td>
        <td>${file.rev}</td>
        <td>${file.current}</td>
        <td>${file.trend}</td>
      </tr>
    `).join(' ')}
  </tbody>
</table>
`

const compareHtmlReport = (data) => `
<h2> Debt collector report </h2>

${data.noChangesFiles.length > 0 && `
  <h3 color="#999">Files with same debt :</h3>
  ${createTable(data.noChangesFiles)}
`}

${data.lessDeptFiles.length > 0 && `
  <h3 color="green">Files with less debt </h3>
  ${createTable(data.noChangesFiles)}
`}

${data.moreDeptFiles.length > 0 && `
  <h3 color="red">Files with more debt </h3>
  ${createTable(data.noChangesFiles)}
`}
</br>

<h4>Previous debt : ${data.totalScores.rev.toString()}<h4>
<h4>Current debt : ${data.totalScores.cur.toString()}<h4>
<h2 color="${data.resultColor(data.totalScores.solde)}">
  ${data.totalScores.solde.toString()}
<h2>

<p>To get a file by file report, please run debt-collector check --changed-since="[REVISION]"</p>
`

export default compareHtmlReport