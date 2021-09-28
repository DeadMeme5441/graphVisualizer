import React from 'react'
import Plot from 'react-plotly.js'
import axios from 'axios'

const Graph = ({ type, X, Y }) => {

  const [data, setData] = React.useState(null);
  const [layout, setLayout] = React.useState(null);

  React.useEffect(() => {
    if (type === "regression") {
      axios.post('http://localhost:5000/graph/regression', {
        X: X,
        Y: Y,
      }).then(response => {
        console.log(response.data)
        setData(response.data.data)
        setLayout(response.data.layout)
      })
    }
    else if (type === "timeseries") {
      axios.post('http://localhost:5000/graph/timeseries', {
        X: X,
        Y: Y,
      }).then(response => {
        console.log(response.data)
        setData(response.data.data)
        setLayout(response.data.layout)
      })
    }
    else if (type === "jointplot") {
      axios.post('http://localhost:5000/graph/jointplot', {
        X: X,
        Y: Y,
      }).then(response => {
        console.log(response.data)
        setData(response.data.data)
        setLayout(response.data.layout)
      })
    }
  }, [type, X, Y])

  return (
    <div className="container mx-auto">
      <Plot data={data} layout={layout} />
    </div>
  )
}

export default Graph;
