import fs from 'fs'
import chartTemplate from './chartTemplate.js'
import type { UserConfig, WalkResults, WalkReportTagList } from '../types.js'
import { SpeedEstimation } from '../../components/walk/getEndDatesEstimations.js'

const cachePath = `${process.cwd()}/node_modules/.cache/debt-collector`

const buildWalkReport = ({
  userConfig,
  tags,
  results,
  endDateEstimations,
  reportName,
  reportsLinks,
}: {
  userConfig: UserConfig
  tags: WalkReportTagList
  results: WalkResults
  endDateEstimations: {
    rules: Record<string, SpeedEstimation>
    global: SpeedEstimation
  }
  reportName: string
  reportsLinks: {
    name: string
    link: string
  }[]
}) => {
  setTimeout(() => {
    // waiting for file system to correctly switch all files after checkout
    const resultPath = `${cachePath}/report-${reportName}.html`
    const jsonResults = JSON.stringify(
      {
        initialConfig: userConfig,
        reportsLinks,
        tags,
        results,
        endDateEstimations,
      },
      null,
      2
    )

    const data = chartTemplate(jsonResults)
    // const data = jsonResults

    fs.mkdir(cachePath, { recursive: true }, (err) => {
      if (err) throw err
      fs.writeFileSync(resultPath, data)
    })
  }, 330)
}

export default buildWalkReport
