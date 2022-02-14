import fs from 'fs'
import { spawn } from 'child_process'
import template from './template';

const cachePath = `${process.cwd()}/node_modules/.cache/debt-collector`
const resultPath = `${cachePath}/result.html`

const buildWalkReport = (defaultConfig, tags, results) => {
  setTimeout(() => {
    // waiting for file system to correctly switch all files after checkout
    const jsonResults = JSON.stringify({
      initialConfig: defaultConfig,
      tags,
      results,
    }, null, 2)
    
    const data = template(jsonResults)
    
    fs.mkdir(cachePath, { recursive: true }, (err) => {
      if (err) throw err;

      fs.writeFileSync(resultPath, data)
    
      spawn('open' , [resultPath])
    })
  }, 330)
}

export default buildWalkReport