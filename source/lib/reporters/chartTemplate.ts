export default (data: string) => `
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.14.0/babel.min.js"></script>
    <script type="text/babel" data-presets="es2017, stage-3" data-plugins="syntax-async-functions,transform-class-properties"></script>
    <script src="https://unpkg.com/react/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/prop-types/prop-types.min.js"></script>
    <script src="https://unpkg.com/recharts/umd/Recharts.js"></script>
     <style type="text/css">
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      }
    </style>
</head>
<body>
<div id="app"></div>
<script type="text/babel">

const result = ${data}
const reportsLinks = result.reportsLinks

const { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = window.Recharts

const ReportDebtPaymentProjection = ({period, title}) => (
  <div  style={{ padding: 20, flex: 1 }}>
    <div>At an avarage rythme of <b>{Math.round(period.tendencyMonth*100)/100} points/month</b>,<br/> it would require <b>{period.daysToReachZero} days</b> to reach zero debt.<br/> Debt would be payed in full on <b>{
      new Date(
        period.estimatedendDate
      ).toDateString()}</b>
    </div>
  </div>
)

const parseDataBy = (key) => result.results.map((commit) => {

  const rulesScores = commit.brokenRules.map(rule => ({
    [rule.ruleId]: rule[key]
  })).reduce((acc, res) => ({...acc, ...res}), {})

  return {
    commit,
    ...rulesScores
  }
})

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function shadeColor(color, percent) {
  const channel = (chan) => {
    let colChan = parseInt(chan, 16);
    colChan = parseInt(colChan * (100 + percent) / 100);
    colChan = colChan < 255 ? colChan : 255;
    colChan = colChan.toString(16).length === 1
      ? "0" + colChan.toString(16)
      : colChan.toString(16);
    return colChan
  }

  const RR = channel(color.substring(1,3));
  const GG = channel(color.substring(3,5));
  const BB = channel(color.substring(5,7));

  return "#"+RR+GG+BB;
}

const colors = Array(100).fill('').map(() =>  shadeColor(getRandomColor(), -20))
const newData = parseDataBy('ruleTotalSore')

const baseButtonStyles = {
  padding: 4,
  textAlign: 'left',
  marginBottom: 6,
  marginRight: 6,
  border: 'none',
  outline: 'none',
  fontWeight: 'bold',
}

const rules = Object.keys(newData[0]).filter(key => key !== 'commit')
const rulesActives = rules.reduce((acc, rule) => {
  acc[rule] = true
  return acc
}, {})

 const App = () => {
   const [data, setData] = React.useState(newData)
   const [valueType, setValueType] = React.useState('ruleTotalSore')
   const [activeRules, setActiveRules] = React.useState(rulesActives)
   const [tagFilter, setTagFilter] = React.useState(null)
   const [chartType, setChartType] = React.useState('area')
   const [estimationsBasedOn, setEstimationsBasedOn] = React.useState('avairage')

   const toggleRule = (id) => {
    setTagFilter(null)
    setActiveRules(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
   }

   const switchDataBy = (key) => {
      setValueType(key)
      setData(parseDataBy(key))
   }

   const toggleAll = () => {
     setTagFilter(null)
     setActiveRules(prev => {
       const rulesKeys = Object.keys(prev)
       const firstIsActive = !!prev[rulesKeys[0]]
       return rulesKeys.reduce((rules, rule) => {
         rules[rule] = !firstIsActive
         return rules
       }, {})
     })
   }

   const toggleTag = (tag) => {
     if (tagFilter === null || tagFilter !== tag) {
       setTagFilter(tag)
     } else {
       setTagFilter(null)
     }
   }

   const renderTooltip = ({payload}) => {
    if (!payload || !payload.length) { return null }
     return <div style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}>
      <h4 style={{ margin: 0, marginBottom: 5}}>{payload[0].payload.commit.date}</h4>
      <h4 style={{ margin: 0, marginBottom: 15}}>
        Total : {payload.reduce((totalScore, {value}) => totalScore + value, 0)}
      </h4>
      <p style={{ margin: 0, marginBottom: 5}}>{payload[0].payload.commit.name}</p>
      <br/>
        {payload.reverse().map(item => (
          <div key={item.dataKey} style={{ display: 'flex', justifyContent:'center', fontSize: 12, marginBottom: 4}}>
            <span style={{ backgroundColor: item.color, display: 'inline-block', width: 15, height: 15, borderRadius: 3, marginRight: 7}}></span>
            <div style={{ flex: 1, marginRight: 25}}>
              <span>{item.name.replace(/_/g, ' ')}</span>
            </div>
            <span style={{ fontWeight: 'bold'}}>{item.value}</span>
          </div>
        ))}
      </div>
   }

  React.useEffect(() => {
    if (tagFilter) {
      setActiveRules(rules => Object.keys(rules).reduce((acc, rule) => {
        if (result.tags[tagFilter].includes(rule)) {
          acc[rule] = true
        } else {
          acc[rule] = false
        }
        return acc
      }, {}))
    }
  }, [tagFilter])

   return (
     <React.Fragment>
     {reportsLinks.length > 0 && (
      <ul style={{ listStyle: 'none', display: 'flex' }}>
        {reportsLinks.map(({ name, link }) => (
          <li style={{ listStyle: 'none', marginRight: 10 }} key={link}>
            <a
              style={{
                padding: '5px 10px',
                textDecoration: 'none',
                backgroundColor: '#F5F5F5',
                fontWeight: 'bold',
                color: '#000',
                fontSize: 12,
                textTransform: 'uppercase'
              }}
              href={link}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    )}
      <div style={{display: 'flex', overflow: 'hidden', width: '100vw', height:'80vh'}}>
        <div style={{width: '80vw', height:'80vh'}}>
          <div style={{height:40, paddingLeft: 40}}>
            <button
                onClick={() => setChartType('area')}
                style={{
                  ...baseButtonStyles,
                  backgroundColor: chartType === 'area' ? 'green' : '#F5F5F5',
                  color: chartType === 'area' ? 'white' : 'grey'
                }}
              >
                AREA CHART
              </button>
              <button
                onClick={() => setChartType('line')}
                style={{
                  ...baseButtonStyles,
                  backgroundColor: chartType === 'line' ? 'green' : '#F5F5F5',
                  color: chartType === 'line' ? 'white' : 'grey'
                }}
              >
                LINE CHART
              </button>
          </div>
          {chartType === 'area' &&
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="commit" />
              <YAxis />
              <Tooltip
                content={renderTooltip}
                itemStyle={{fontSize: 10, fontWeight: 'bold', fontFamily: 'sans-serif', height: 10, padding: 3}}
                labelStyle={{fontSize: 16, fontWeight: 'bold', fontFamily: 'sans-serif'}}
              />
              {Object.keys(activeRules).map((rule, index) => activeRules[rule] &&
                <Area
                  type="monotone"
                  dataKey={rule}
                  stackId="1"
                  stroke={colors[Object.keys(activeRules).indexOf(rule)]}
                  fill={colors[Object.keys(activeRules).indexOf(rule)]} />
              )}
            </AreaChart>
          </ResponsiveContainer>
          }
          {chartType === 'line' &&
          <ResponsiveContainer width="100%" height="90%">
            <LineChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="commit" />
              <YAxis />
              <Tooltip
                content={renderTooltip}
                itemStyle={{fontSize: 10, fontWeight: 'bold', fontFamily: 'sans-serif', height: 10, padding: 3}}
                labelStyle={{fontSize: 16, fontWeight: 'bold', fontFamily: 'sans-serif'}}
              />
              {Object.keys(activeRules).map((rule, index) => activeRules[rule] &&
                <Line
                  type="monotone"
                  dataKey={rule}
                  stackId="1"
                  stroke={colors[Object.keys(activeRules).indexOf(rule)]}
                  fill={colors[Object.keys(activeRules).indexOf(rule)]} />
              )}
            </LineChart>
          </ResponsiveContainer>
          }
          </div>


          <div style={{width: '20vw', minWidth: 400, height:'80vh', overflowY: 'auto', padding: 20}}>
            <h3>Rules</h3>
            {Object.keys(activeRules).map(rule =>
              <button
                key={rule}
                onClick={() => toggleRule(rule)}
                style={{
                  ...baseButtonStyles,
                  backgroundColor: activeRules[rule] ? 'green' : '#F5F5F5',
                  color: activeRules[rule] ? 'white' : 'grey'
                }}
              >
                {rule}
              </button>
            )}
            <div style={{ marginTop: 15 }}>
              <button onClick={() => toggleAll()}>TOGGLE ALL RULES</button>
            </div>
            <hr />
            <h3>Tags</h3>
            {Object.keys(result.tags).map(tag =>
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                style={{
                  ...baseButtonStyles,
                  display: 'inline-block',
                  backgroundColor: tagFilter === tag ? 'green' : '#F5F5F5',
                  color: tagFilter === tag ? 'white' : 'grey'
                }}
              >
                {tag}
              </button>
            )}
            <hr />
            <h3>Display values</h3>
            <button
              onClick={() => switchDataBy('ruleTotalSore')}
              style={{
                ...baseButtonStyles,
                display: 'inline-block',
                backgroundColor: valueType === 'ruleTotalSore' ? 'green' : '#F5F5F5',
                color: valueType === 'ruleTotalSore' ? 'white' : 'grey'
              }}>
                BY SCORE
            </button>
            <button
              onClick={() => switchDataBy('occurences')}
              style={{
                ...baseButtonStyles,
                display: 'inline-block',
                backgroundColor: valueType === 'occurences' ? 'green' : '#F5F5F5',
                color: valueType === 'occurences' ? 'white' : 'grey'
              }}>
                BY OCCURENCES
            </button>
            <hr />
          </div>
        </div>
        <div style={{textAlign: 'center', maxWidth: 1600, margin: '0 auto'}}>
          <hr />
            <button
              onClick={() => setEstimationsBasedOn('avairage')}
              style={{
                ...baseButtonStyles,
                display: 'inline-block',
                backgroundColor: estimationsBasedOn === 'avairage' ? 'green' : '#F5F5F5',
                color: estimationsBasedOn === 'avairage' ? 'white' : 'grey'
              }}>
                AVERAGE ALL PERIODS
            </button>
            <button
              onClick={() => setEstimationsBasedOn('lastPeriod')}
              style={{
                ...baseButtonStyles,
                display: 'inline-block',
                backgroundColor: estimationsBasedOn === 'lastPeriod' ? 'green' : '#F5F5F5',
                color: estimationsBasedOn === 'lastPeriod' ? 'white' : 'grey'
              }}>
                LAST PERDIOD
            </button>

          <h2 style={{margin: 0, marginTop: 30}}>Current score : {result.enDateEstimlations.global.currentScore}</h2>
          <h3 style={{margin: 0}}>Estimated date for full reimbursment:</h3>
          <div style={{display: 'flex'}}>
            <ReportDebtPaymentProjection period={result.enDateEstimlations.global[estimationsBasedOn]}/>
          </div>
          <div style={{textAlign: 'right', marginBottom: 200}}>
            <table width="100%" style={{textAlign: 'right', marginBottom: 200}}>
              <thead>
                <tr>
                  <th style={{textAlign: 'left'}}>Rule ID</th>
                  <th>Current score</th>
                  <th>Debt points/month</th>
                  <th>Days remaining to zero</th>
                  <th>Estimated date to zero</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(result.enDateEstimlations.rules).map(ruleId => {
                  const {
                    tendencyMonth,
                    daysToReachZero,
                    estimatedendDate
                  } = result.enDateEstimlations.rules[ruleId][estimationsBasedOn]
                  const {currentScore} = result.enDateEstimlations.rules[ruleId]
                  return (
                    <tr key={ruleId} style={{color: tendencyMonth >= 0 ? 'red' : '#222'}}>
                      <td style={{textAlign: 'left'}}>{ruleId}</td>
                      <td>{currentScore} points</td>
                      <td>{Math.round(tendencyMonth*100)/100} points/month</td>
                      <td>{daysToReachZero ? daysToReachZero + ' days' : 'never'} </td>
                      <td>{estimatedendDate === 'never' ? estimatedendDate : new Date(estimatedendDate).toDateString()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
}

ReactDOM.render(<App/>, document.getElementById('app'));
</script>
</body>
</html>
`
