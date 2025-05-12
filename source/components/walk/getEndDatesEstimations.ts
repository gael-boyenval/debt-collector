import { Config, RevisionResults } from '../../lib/types.js'

const getDateRulesDatas = ({
  config,
  results,
}: {
  config: Config
  results: RevisionResults[]
}): {
  rules: Record<string, { date: string; score: number }[]>
  global: { date: string; score: number }[]
} => {
  // console.log('getDateRulesDatas results', results)
  // console.log('getDateRulesDatas config', config)
  const allRules = config.fileRules?.map((rule) => rule.id) ?? []
  // console.log('getDateRulesDatas allRules', allRules)
  const rulesDateScoreObj = allRules.reduce(
    (acc, ruleId) => {
      acc[ruleId] = results.map(({ date, brokenRules }) => {
        const rule = brokenRules?.find(({ ruleId: id }) => id === ruleId)
        const score = rule ? rule.ruleTotalSore : 0
        return { date, score }
      })
      return acc
    },
    {} as Record<string, { date: string; score: number }[]>
  )

  const global = results.map(({ date, totalScore }) => ({
    date,
    score: totalScore,
  }))

  return {
    rules: rulesDateScoreObj,
    global,
  }
}

export type SpeedEstimation = {
  currentScore: number
  avairage: {
    tendencyDay: number
    tendencyMonth: number
    daysToReachZero: number
    estimatedendDate: Date | 'never'
  }
  lastPeriod: {
    tendencyDay: number
    tendencyMonth: number
    daysToReachZero: number
    estimatedendDate: Date | 'never'
  }
}

const getSpeedEstimation = (
  arr: { date: string; score: number }[]
): SpeedEstimation => {
  // console.log('getSpeedEstimation arr', arr)
  if (arr.length === 0) {
    return {
      currentScore: 0,
      avairage: {
        tendencyDay: 0,
        tendencyMonth: 0,
        daysToReachZero: 0,
        estimatedendDate: 'never',
      },
      lastPeriod: {
        tendencyDay: 0,
        tendencyMonth: 0,
        daysToReachZero: 0,
        estimatedendDate: 'never',
      },
    }
  }

  const trend: {
    lastDate: string
    lastScore: number
    trendArr: number[]
  } = arr.reduce(
    (acc, { date, score }) => {
      // console.log('acc', acc)
      if (Object.keys(acc).length === 0) {
        return {
          lastDate: date,
          lastScore: score,
          trendArr: [],
        }
      }

      const diff = score - acc.lastScore
      const diffDays = Math.floor(
        (new Date(date).getTime() - new Date(acc.lastDate).getTime()) /
          (1000 * 60 * 60 * 24)
      )

      const diffScoreByDay = diff / diffDays

      acc.lastDate = date
      acc.lastScore = score
      acc.trendArr.push(diffScoreByDay)

      return acc
    },
    {} as { lastDate: string; lastScore: number; trendArr: number[] }
  )

  const addDays = (theDate: Date, days: number) =>
    new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000)

  const avairageTendencyDay =
    trend.trendArr?.reduce(
      (acc: number, monthTrend: number) => acc + monthTrend,
      0
    ) / trend.trendArr?.length || 0

  const avairageTendencyMonth = avairageTendencyDay * 30.5

  const avairageDaysToReachZero =
    avairageTendencyMonth <= 0
      ? Math.round(Math.abs(trend.lastScore / avairageTendencyDay))
      : Infinity

  const lastCommitDate = new Date(trend.lastDate)

  const avairageEndDebtDate =
    avairageTendencyDay >= 0
      ? ('never' as const)
      : addDays(new Date(lastCommitDate), avairageDaysToReachZero)

  const lastPeriodTendencyDay = trend.trendArr[trend.trendArr?.length - 1] || 0

  const lastPeriodDaysToReachZero =
    lastPeriodTendencyDay <= 0
      ? Math.round(Math.abs(trend.lastScore / lastPeriodTendencyDay))
      : Infinity

  const lastPeriodEndDebtDate =
    lastPeriodTendencyDay >= 0
      ? ('never' as const)
      : addDays(new Date(lastCommitDate), lastPeriodDaysToReachZero)

  const result = {
    currentScore: trend.lastScore,
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

  // console.log('result', result)

  return result
}

export const getEndDatesEstimations = (results: {
  config: Config
  results: RevisionResults[]
}) => {
  // console.log('getEndDatesEstimations results prop', results)
  const resultRuleDatas = getDateRulesDatas(results)
  // console.log('getEndDatesEstimations resultRuleDatas', resultRuleDatas)

  const endDateEstimation: {
    rules: Record<string, SpeedEstimation>
    global: SpeedEstimation
  } = {
    rules: {} as Record<string, SpeedEstimation>,
    global: {} as SpeedEstimation,
  }

  endDateEstimation.rules = Object.keys(resultRuleDatas.rules).reduce(
    (acc, key) => {
      acc[key] = getSpeedEstimation(resultRuleDatas.rules[key] || [])
      return acc
    },
    {} as Record<string, SpeedEstimation>
  )

  endDateEstimation.global = getSpeedEstimation(resultRuleDatas.global)

  return endDateEstimation
}
