export default (data) => `

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
const { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = window.Recharts

const parseDataBy = (key) => Object.keys(result.results).map((commit) => {
  const rulesScores = Object.keys(result.results[commit]).map(rule => ({
    [rule]: result.results[commit][rule][key]
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
const newData = parseDataBy('score')

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
   const [valueType, setValueType] = React.useState('score')
   const [activeRules, setActiveRules] = React.useState(rulesActives)
   const [tagFilter, setTagFilter] = React.useState(null)
   
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

   const renderTooltip = ({label, payload}) => {
    if (!payload.length) { return null}
   
     return <div style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}>
        <h2 style={{ margin: 0, marginBottom: 5}}>{label}</h2>
        <h3 style={{ margin: 0, marginBottom: 15}}>Total {valueType} : { 
        payload.reduce((acc, cur) => {
          acc += Number(cur.value)
          return acc
        }, 0)
        } </h3>
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
     <div style={{display: 'flex', overflow: 'hidden', width: '100vw', height:'100vh', position:'fixed'}}>
      <div style={{width: '80vw', height:'100vh'}}>
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
        </div>
        <div style={{width: '20vw', minWidth: 400, height:'100vh', overflowY: 'auto', padding: 20}}>
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
            onClick={() => switchDataBy('score')}
            style={{
              ...baseButtonStyles,
              display: 'inline-block',
              backgroundColor: valueType === 'score' ? 'green' : '#F5F5F5',
              color: valueType === 'score' ? 'white' : 'grey'
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
    );
}

ReactDOM.render(<App/>, document.getElementById('app'));
</script>
</body>
</html>
`;
