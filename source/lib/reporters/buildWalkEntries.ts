import fs from 'fs'
import { spawn } from 'child_process'
import { entriesTemplate } from './packagesEntriesTemplate.js'

const cachePath = `${process.cwd()}/node_modules/.cache/debt-collector`

const buildWalkEntriesReport = (reportsLinks: any, openReport?: boolean) => {
  setTimeout(() => {
    // waiting for file system to correctly switch all files after checkout
    const resultPath = `${cachePath}/index.html`
    const jsonResults = JSON.stringify(reportsLinks, null, 2)

    const data = entriesTemplate(jsonResults)
    // const data = jsonResults

    fs.mkdir(cachePath, { recursive: true }, (err) => {
      if (err) throw err

      fs.writeFileSync(resultPath, data)

      if (!!openReport) {
        try {
          spawn('open', [resultPath])
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(
            'tried to open file but could not... it may be because we are in a virtual env'
          )
        }
      }
    })
  }, 330)
}

export default buildWalkEntriesReport
