import { minimatch } from 'minimatch'

export const filterIgnoredFiles = (
  files: string[],
  excludePatterns: string[] = [],
  includePatterns: string[] = []
): string[] =>
  files.filter((file) => {
    const matchGlob = (glob: string): boolean =>
      minimatch(file, glob.replace(/^\.\//, ''))

    const isFileIncluded = includePatterns.some(matchGlob)
    const isFileExcluded = excludePatterns.some(matchGlob)

    return isFileIncluded && !isFileExcluded
  })