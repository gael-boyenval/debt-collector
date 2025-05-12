export const entriesTemplate = (data: string): string => `
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.14.0/babel.min.js"></script>
    <script type="text/babel" data-presets="es2017, stage-3" data-plugins="syntax-async-functions,transform-class-properties"></script>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/prop-types/prop-types.min.js"></script>
     <style type="text/css">
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      }
    </style>
</head>
<body>
<div id="app"></div>
<script type="text/babel">

const entries = ${data}
const App = () => (
    <ul style={{ listStyle: 'none', display: 'flex' }}>
      {entries.map(({ name, link }) => (
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
  )

ReactDOM.render(<App/>, document.getElementById('app'));
</script>
</body>
</html>
`
