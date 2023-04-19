import { readFileSync } from 'fs'
import process from 'process'
import path from 'path'

export default async function getPackagesList() {
  const packagesJsonFileContent = readFileSync(
    path.resolve(process.cwd(), './package.json'),
    'utf-8'
  )
  const { devDependencies, dependencies } = JSON.parse(packagesJsonFileContent)
  const list = Object.entries(dependencies).concat(
    Object.entries(devDependencies)
  )
  return list.filter((entry) => !entry[0].startsWith('@types'))
}
