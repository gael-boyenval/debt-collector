import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'ink';
import { TaskList, Task } from 'ink-task-list';
import getFilesList from '../../lib/getFilesList'
import checkFileList from '../../lib/checkFileList';
import useValidatedConfig from '../../lib/useValidatedConfig';
import buildWalkReport from '../../lib/buildWalkReport';
import getTagListFromConfig from '../../lib/getTagListFromConfig';
import simpleGit from 'simple-git'
import fs from 'fs'
import path from 'path'

const gitOptions = {
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6,
};

const git = simpleGit(gitOptions)
let currentBranch

const getCommitList = async (nth: number): Promise<string[]> => {
  currentBranch = await git.revparse(['--abbrev-ref', 'HEAD'])
  const list = await git.tag(['-l', 'v*.0.0', '--sort', 'v:refname', '--format', '%(refname:strip=2)'])
  
  const listArray = list.split(/\r?\n/)
    .reverse()
    .filter(tag => tag !== '')
    .slice(0, nth)
    .reverse()

  return listArray
}

const formatCommitTotal = (config, results) => {
  const configRules = [
    ...config.fileRules.map(rule => rule.id),
    ...config.eslintRules.map(rule => rule.id),
  ].reduce((acc, id) => ({
      ...acc,
      [id]: {
        score: 0,
        occurences: 0
      }
    })
  , {})

  Object.keys(results).forEach((file) => {
    const currentFile = results[file]
    if (currentFile.rules.length > 0) {
      currentFile.rules.forEach(({id, debtScore, occurences}) => {
        configRules[id].score = configRules[id].score + debtScore * occurences
        configRules[id].occurences = configRules[id].occurences + occurences
      });
    }
  });

  return configRules
}


const Compare = ({
  revlength = 10,
  config,
  collectFrom = null
}) => {
  const [results, setResults] = useState({})
  const [currentCommit, setCurrentCommit] = useState({ commit: '', index: 0 })
  const [isReady, setIsReady] = useState(false)
  const [tags, setTags] = useState({})

	const {
		isConfigValidated,
		updatedConfig,
		configErrors,
    defaultConfig
	} = useValidatedConfig(config)

	useEffect(() => {
		(async() => {
			if (isConfigValidated) {
        setTags(getTagListFromConfig(defaultConfig))
        
        const commitsList = await getCommitList(revlength)
        let previousResults
        
        for (const [index, commit] of commitsList.entries()) {
          setCurrentCommit({ commit, index: index + 1 })
          await git.checkout([commit])
          const since = index === 0 ? null : commitsList[index - 1]
          const fileList = await getFilesList(updatedConfig, since, collectFrom)
				  const results = await checkFileList(fileList, updatedConfig, null, null, () => null)
          
          let mergedResults = results.reduce((acc, res) => {
            acc[res.file] = res
            return acc
          }, {})
          
          if (previousResults) {
            mergedResults = {
              ...previousResults,
              ...mergedResults,
            }

            mergedResults = Object.keys(mergedResults).reduce((acc, file) => {
              const fileStillExist = fs.existsSync(path.resolve(process.cwd(), `./${file}`))

              if (fileStillExist) {
                acc[file] = mergedResults[file]
              }

              return acc
            }, {})          
          }
                    
          previousResults = mergedResults

          const resultsByRules = formatCommitTotal(defaultConfig, mergedResults)
          setResults(prevRes => ({...prevRes, [commit]: resultsByRules}))
        }
        
        await git.checkout([currentBranch])
        setIsReady(true)
			}
		})()
	}, [isConfigValidated])

  useEffect(() => {
		(async() => {
			if (isReady) {
        buildWalkReport(defaultConfig, tags, results)
			}
		})()
	}, [isReady])
	
	return (
    <TaskList>
      <Task 
        state={!isReady ? 'loading' : 'success'}
        label={`checking the last ${revlength} commits`}
        status={`checking commit ${currentCommit.index}/${revlength} : ${currentCommit.commit}`}
      />
      <Task 
        state={!isReady ? 'pending' : 'loading'}
        label={`Building a report`}
      />
    </TaskList>
	)
};

Compare.propTypes = {
  revlength: PropTypes.number,
  config: PropTypes.string,
  collectFrom: PropTypes.string,
};

Compare.shortFlags = {
  revlength: 'n',
  config: 'c',
  collectFrom: 'f'
};

export default Compare;
