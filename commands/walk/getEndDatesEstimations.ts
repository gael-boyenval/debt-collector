const getDateRulesDatas = ({ initialConfig, results }) => {
  const allRules = [
    ...(initialConfig.fileRules ?? []),
    ...(initialConfig.eslintRules ?? []),
  ].map((rule) => rule.id)

  const rulesDateScoreObj = allRules.reduce((acc, ruleId) => {
    acc[ruleId] = results.map(({ date, brokenRules }) => {
      const rule = brokenRules.find(({ ruleId: id }) => id === ruleId)
      const score = rule ? rule.ruleTotalSore : 0
      return { date, score }
    })
    return acc
  }, {})

  const global = results.map(({ date, totalScore }) => ({
    date,
    score: totalScore,
  }))

  return {
    rules: rulesDateScoreObj,
    global,
  }
}

const getSpeedEstimation = (arr) => {
  const trendCalculation = arr.reduce((acc, { date, score }) => {
    if (!acc.prevDate && !acc.prevScore) {
      acc.prevDate = date
      acc.prevScore = score
      acc.trendArr = []
      return acc
    }

    const diff = score - acc.prevScore
    const diffDays =
      (new Date(date) - new Date(acc.prevDate)) / (1000 * 60 * 60 * 24)

    const diffScoreByDay = diff / diffDays

    acc.prevDate = date
    acc.prevScore = score
    acc.trendArr.push(diffScoreByDay)

    return acc
  }, {})

  const addDays = (theDate, days) =>
    new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000)

  const avairageTendencyDay =
    trendCalculation.trendArr.reduce((acc, monthTrend) => acc + monthTrend, 0) /
    trendCalculation.trendArr.length

  const avairageTendencyMonth = avairageTendencyDay * 30.5

  const avairageDaysToReachZero =
    avairageTendencyMonth <= 0
      ? Math.round(Math.abs(trendCalculation.prevScore / avairageTendencyDay))
      : Infinity

  const lastCommitDate = new Date(trendCalculation.prevDate)

  const avairageEndDebtDate =
    avairageTendencyDay >= 0
      ? 'never'
      : addDays(new Date(lastCommitDate), avairageDaysToReachZero)

  const lastPeriodTendencyDay =
    trendCalculation.trendArr[trendCalculation.trendArr.length - 1]

  const lastPeriodDaysToReachZero =
    lastPeriodTendencyDay <= 0
      ? Math.round(Math.abs(trendCalculation.prevScore / lastPeriodTendencyDay))
      : Infinity

  const lastPeriodEndDebtDate =
    lastPeriodTendencyDay >= 0
      ? 'never'
      : addDays(new Date(lastCommitDate), lastPeriodDaysToReachZero)

  return {
    currentScore: trendCalculation.prevScore,
    avairage: {
      tendencyDay: avairageTendencyDay,
      tendencyMonth: avairageTendencyMonth,
      daysToReachZero: avairageDaysToReachZero,
      estimatedendDate: avairageEndDebtDate,
    },
    lastPeriod: {
      tendencyDay: lastPeriodTendencyDay,
      tendencyMonth: lastPeriodTendencyDay * 30.5,
      daysToReachZero: lastPeriodDaysToReachZero,
      estimatedendDate: lastPeriodEndDebtDate,
    },
  }
}

const getEndDatesEstimations = (results) => {
  const resultRuleDatas = getDateRulesDatas(results)
  const endDateEstimation = {}

  endDateEstimation.rules = Object.keys(resultRuleDatas.rules).reduce(
    (acc, key) => {
      acc[key] = getSpeedEstimation(resultRuleDatas.rules[key])
      return acc
    },
    {}
  )

  endDateEstimation.global = getSpeedEstimation(resultRuleDatas.global)

  return endDateEstimation
}

export default getEndDatesEstimations
