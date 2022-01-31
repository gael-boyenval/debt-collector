import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Box } from 'ink';
import { TaskList, Task } from 'ink-task-list';
import getFilesList from '../lib/getFilesList'
import checkFileList from '../lib/checkFileList';
import { Results, ResultsFileOnly, ResultsNoMatchRule } from '../components/Reporter'
import useValidatedConfig from '../lib/useValidatedConfig';

const All = ({
	rule = null, 
  tags = null,
  config = null,
 	collectFrom = null,
	reportFormat = 'standard',
  changedSince = null,
	limitTop = null,
}) => {
	const [results, setResults] = useState(null)
	const [fileList, setFileList] = useState(null)
	const [checkedFileCount, setCheckedFileCount] = useState(0)

	const {
		isConfigValidated,
		updatedConfig,
	} = useValidatedConfig(config)

	const cleanTags = tags?.filter((tag) => tag !== undefined)

	useEffect(() => {
		(async() => {
			if (isConfigValidated) {
				const result  = await getFilesList(updatedConfig, changedSince, collectFrom)
				setFileList(result)
			}
		})()
	}, [isConfigValidated])

	useEffect(() => {
		(async() => {
			if (fileList !== null) {
				const increment = () => setCheckedFileCount(prevCount => prevCount += 1)	
				const results = await checkFileList(fileList, updatedConfig, rule, tags, increment)
				setResults(results)
			}
		})()
	}, [fileList])

	const collectingFrom = `Collecting debt from ${changedSince ? `files changed since ${changedSince}` : collectFrom ? collectFrom : 'all files'}`
	const hasFilters = cleanTags.length || rule
	const tagFilters = cleanTags.length > 0 && ` [tags : ${cleanTags}]`
	const and = (cleanTags.length > 0 && rule) ? ' &': ''
	const ruleFilter = rule ? ` [rule id : ${rule}]` : ''
	const withFilters = `With rules filters on ${tagFilters}${and}${ruleFilter}`
	
	return (
		<>
			<TaskList>
				<Task 
					state={isConfigValidated === null ? 'loading' : isConfigValidated ? 'success' : 'error'}
					label="validating configuration"
					status={isConfigValidated === null ? 'checking configuration' : isConfigValidated ? 'success' : 'error'}
				/>
				<Task 
					state={fileList === null ? 'loading': 'success'}
					label="defining file to check"
					status={fileList === null ? null : `${fileList.length} files`}
				/>
				<Task
					state={results === null ? 'loading' : 'success' }
					label="checking files"
					status={ `${checkedFileCount}/${fileList === null ? '?' : fileList.length} files`}
				/>
			</TaskList>

			{isConfigValidated === false && (
				<Text color="red">Error during config</Text>
			)}
			
			{results !== null && reportFormat === 'standard' && <Results results={results} limitTop={limitTop} />}
			{results !== null && reportFormat === 'filesOnly' && <ResultsFileOnly results={results} limitTop={limitTop} />}
			{results !== null && reportFormat === 'noMatchRules' && <ResultsNoMatchRule results={results} initialConfig={updatedConfig} />}

			<Box marginTop={1} flexDirection="column" border>
				<Text color="grey">{collectingFrom}</Text>
				{hasFilters && (
					<Text color="grey">{withFilters}</Text>
				)}
				<Text color="grey">Reporting : {reportFormat} {limitTop && `• top ${limitTop} biggest score`}</Text>
			</Box>
		</>
	)
};

All.propTypes = {
	limitTop: PropTypes.number,
 	collectFrom: PropTypes.string,
	rule: PropTypes.string, 
  tags: PropTypes.array,
  config: PropTypes.string,
  changedSince: PropTypes.string,
	reportFormat: PropTypes.oneOf(['filesOnly', 'noMatchRules', 'standard']),
};

All.shortFlags = {
	rule: 'r', 
  tags: 't',
 	collectFrom: 'g',
  config: 'c',
	reportFormat: 'f',
	changedSince: 's',
};

export default All;
