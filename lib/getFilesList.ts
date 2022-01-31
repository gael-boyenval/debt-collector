import glob from 'glob'
import simpleGit from 'simple-git
import path from 'path
import minimatch from 'minimatch'


const gitOptions = {
   baseDir: process.cwd(),
   binary: 'git',
   maxConcurrentProcesses: 6,
};

const getFileList = async (config, compare, globOption) => {
  const globFilter = globOption ? globOption : config.collectFrom
  
  if (compare) {
    return new Promise(async (resolve, reject) => {
      const git = simpleGit(gitOptions)
      const rootGitDir = await git.revparse(['--show-toplevel'])
      const results = await git.diff([compare, '--name-status'])
      const currentGitDir = path.relative(rootGitDir, process.cwd())
      const filesAndStatuses = results
        .replace(/\t/g, '|')
        .split('\n')
        .filter(item => item !== '')
        .map(item => {
          const [status, filePath] = item.split('|')

          return {
            status,
            filePath: path.relative(currentGitDir, filePath)
          }
        })
      
      const files = filesAndStatuses.filter((file) => minimatch(
        file.filePath,
        globFilter.replace('./', '')
      )).map((item) => item.filePath)

      resolve(files)
    })
  }

  return new Promise((resolve, reject) => {
    glob(globFilter, {}, (err, files) => {
      if (err) reject(err)
      resolve(files)
    })
  })
}

export default getFileList