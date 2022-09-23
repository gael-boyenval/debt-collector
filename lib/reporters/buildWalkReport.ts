import fs from 'fs'
import { spawn } from 'child_process'
import template from './chartTemplate'

const cachePath = `${process.cwd()}/node_modules/.cache/debt-collector`
const resultPath = `${cachePath}/report.html`

const buildWalkReport = (userConfig, tags, results, enDateEstimlations) => {
  setTimeout(() => {
    // waiting for file system to correctly switch all files after checkout
    const jsonResults = JSON.stringify(
      {
        initialConfig: userConfig,
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
      try {
        spawn('open', [resultPath])
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(
          'tried to open file but could not... it may be because we are in a virtual env'
        )
      }
    })
  }, 330)
}

export default buildWalkReport
