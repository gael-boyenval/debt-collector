import minimatch from 'minimatch'

const filterIgnoredFiles = (
  files: string[],
  ignoredFiles: string[],
  includedFiles: string[]
): string[] =>
  files.filter((file) => {
    const matchGlob = (glob: string): boolean =>
      minimatch(file, glob.replace(/^\.\//, ''))

    const isFileIgnored = ignoredFiles.some(matchGlob)
    const isFileIncluded = includedFiles.some(matchGlob)
    return !isFileIgnored && isFileIncluded
  })

export default filterIgnoredFiles
