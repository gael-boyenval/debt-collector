
import React, {useEffect} from 'react'
import Table from 'ink-table'
import { Text, Box } from 'ink';
import compareHtmlReport from '../lib/compareHtmlReport'
import fs from 'fs'

const cachePath = `${process.cwd()}/node_modules/.cache/debt-collector`
const resultPath = `${cachePath}/report.html`

const splitStringIfTooLong = (str, max) => {
  if (str.length < max) return str  
  const charArr = str.split('')  
  const strStart = [...charArr].filter((_char, i) => i >= 0 && i < max/2)
  const strEnd = [...charArr].filter((_char, i) => i > (str.length - max/2) && i < str.length)
  return [...strStart, '....', ...strEnd].join('')
}

const formatResults = (results) => {
	const filteredResults = results.filter(result => result.totalScore > 0)
	const formatedResult = filteredResults.map(({file, rules, totalScore}) => {
		return {
			file: splitStringIfTooLong(file, 80),
			totalScore,
			rules: rules.map(({title, occurences, debtScore}) => ({
				error: title,
				nb: occurences,
				score: debtScore * occurences
			}))
		}
	})

	const totalDeptScore = formatedResult.reduce((acc, res) => acc + res.totalScore, 0)
	
  return {
		formatedResult,
		totalDeptScore
	}
}

export const Results = ({results, limitTop}) => {
	const {
		formatedResult,
		totalDeptScore
	} = formatResults(results)

  let displayResults = formatedResult;

  if (limitTop) {
    displayResults = formatedResult
      .sort((a, b) => b.totalScore - a.totalScore)
      .filter((_item, index) => index < limitTop)
  }
	
	return (
		<>
			{displayResults.length > 0 && displayResults.map((result) => 
				<Box key={result.file} flexDirection="column" marginTop={1}>
					<Text bold color="red" underline>{result.file}</Text>
					<Table data={result.rules} />
					<Text bold color="red">Total Debt Score : {result.totalScore}</Text>
				</Box>
			)}
			<Box marginTop={1}>
				<Text bold backgroundColor="#880000" color="white"> Debt Score : {totalDeptScore} / Impacted files : {formatedResult.length}</Text>
			</Box>
		</>
	)
}

export const ResultsFileOnly = ({results, limitTop}) => {
	const {
		formatedResult,
		totalDeptScore
	} = formatResults(results)

  let displayResults = formatedResult;

  if (limitTop) {
    displayResults = formatedResult
      .sort((a, b) => b.totalScore - a.totalScore)
      .filter((_item, index) => index < limitTop)
  }
	
	return (
		<>
			<Box marginTop={1} />
			{formatedResult.length > 0 && (
				<Table data={displayResults.map(({file, totalScore}) => ({file, score: totalScore}))} />
			)}
			<Box marginTop={1}>
				<Text bold backgroundColor="#880000" color="white"> Debt Score : {totalDeptScore} / Impacted files : {formatedResult.length} </Text>
			</Box>
		</>
	)
}

const filterNoMatch = (results, initialConfig) => {
	const allRules = [
		...initialConfig.fileRules.map(({id, title}) => ({id, title})),
		...initialConfig.eslintRules.map(({id, title}) => ({id, title}))
	]

	const allFilesRules = [].concat.apply([], results.map(file => file.rules.map(({id}) => id)))
	const existingRules = Array.from(new Set([...allFilesRules]))
	
	
	const filteredRules = allRules.filter(({id}) => !existingRules.includes(id))

	return {
		notMatchRules: filteredRules,
		rulesCount: allRules.length,
		existingRulesCount: existingRules.length,
	}
}

export const ResultsNoMatchRule = ({results, initialConfig}) => {
	const { notMatchRules, rulesCount } = filterNoMatch(results, initialConfig)

	return (
		<>
			<Box marginTop={1} />
			{notMatchRules.length > 0 && (
				<Table data={notMatchRules} />
			)}
			<Box marginTop={1}>
				<Text bold backgroundColor="#880000" color="white">
					Nb of rules with no match : {notMatchRules.length} / {rulesCount}
				</Text>
			</Box>
		</>
	)
}

export const ResultsCompare = ({results, outputHtml}) => {
  const tableResults = Object.keys(results).map((fileName) => {
    const result = results[fileName]
    return {
      file: splitStringIfTooLong(fileName, 60),
      rev: result.rev,
      current: result.current,
      trend: result.tendency
    }
  }).filter(file => file.rev !== 0 && file.current !== 0)

  const totalScores = tableResults.reduce((acc, res) => {
    const revScore = res.rev + acc.rev
    const currentScore = res.current + acc.cur

    return {
      rev: revScore,
      cur: currentScore,
      solde: revScore - currentScore,
    }
  }, {
    rev: 0,
    cur: 0,
    solde: 0,
  })

  const noChangesFiles = tableResults
    .filter(item => item.trend === 0)
    .map((file) => ({
      ...file,
      trend: '='
    }))
  
  const moreDeptFiles = tableResults
    .filter(item => item.trend > 0)
    .map((file) => ({
      ...file,
      trend: `▲ ${file.trend}`
    }))

  const lessDeptFiles = tableResults
    .filter(item => item.trend < 0)
    .map((file) => ({
      ...file,
      trend: `▼ ${file.trend}`
    }))

  const resultColor = (nb) => {
    if (nb > 0) return 'red'
    if (nb < 0) return 'green'
    return 'grey'
  }

  useEffect(() => {
    console.log('no outputHtml');
    if (outputHtml) {
      console.log('outputHtml');
      
      setTimeout(() => {
        const html = compareHtmlReport({
          noChangesFiles,
          moreDeptFiles,
          lessDeptFiles,
          resultColor,
          totalScores,
        })

        console.log(html);
        console.log('process.cwd()';
        console.log(process.cwd();
        

        fs.mkdir(cachePath, { recursive: true }, (err) => {
          if (err) throw err;
          fs.writeFileSync(resultPath, html)
        })
      }, 1000)
    }
  }, [])
  
  return (
		<>
			<Box marginTop={1} />
			{noChangesFiles.length > 0 && (
        <Box marginTop={1} flexDirection="column">
          <Text underline bold color="grey">Files with no changes in debt score</Text>
          <Table data={noChangesFiles} />
        </Box>
			)}
      {lessDeptFiles.length > 0 && (
        <Box marginTop={1} flexDirection="column">
          <Text underline bold color="green">Files with less debt</Text>
          <Table data={lessDeptFiles} />
        </Box>
			)}
      {moreDeptFiles.length > 0 && (
        <Box marginTop={1} flexDirection="column">
          <Text underline bold color="red">Files with more debt</Text>
          <Table data={moreDeptFiles} />
        </Box>
			)}
			<Box marginTop={1}>
        <Box paddingLeft={1} paddingRight={1} borderStyle="round"  flexDirection="column">
          <Text>  
            REVISION :{' '}
            <Text>{totalScores.rev.toString()}</Text>
          </Text>
        </Box>
        <Box paddingLeft={1} paddingRight={1} borderStyle="round" flexDirection="column">
          <Text>
            CURRENT :{' '}
            <Text>{totalScores.cur.toString()}</Text>
          </Text>
          
        </Box>
        <Box paddingLeft={1} paddingRight={1} borderStyle="round"  flexDirection="column">
          <Text bold color={resultColor(totalScores.solde)} dimmed>
            DIFF : {totalScores.solde.toString()}
          </Text>
        </Box>
			</Box>
		</>
	)
}