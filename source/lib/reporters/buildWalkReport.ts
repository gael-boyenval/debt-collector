import fs from 'fs'
import template from './chartTemplate'

const cachePath = `${process.cwd()}/node_modules/.cache/debt-collector`

const buildWalkReport = (
  userConfig,
  tags,
  results,
  enDateEstimlations,
  reportName,
  reportsLinks
) => {
  setTimeout(() => {
    // waiting for file system to correctly switch all files after checkout
    const resultPath = `${cachePath}/report-${reportName}.html`
    const jsonResults = JSON.stringify(
      {
        initialConfig: userConfig,
        reportsLinks,
        tags,
        results,
        enDateEstimlations,
      },
      null,
      2
    )

    const data = template(jsonResults)

    fs.mkdir(cachePath, { recursive: true }, (err) => {
      if (err) throw err
      fs.writeFileSync(resultPath, data)
    })
  }, 330)
}

export default buildWalkReport
