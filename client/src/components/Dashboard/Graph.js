import React from 'react'
import Plot from 'react-plotly.js'
import axios from 'axios'

const Graph = ({ type, X, Y, file_name }) => {

  const [data, setData] = React.useState(null);
  const [layout, setLayout] = React.useState(null);
  const [pairURL, setPairURL] = React.useState(null)

  React.useEffect(() => {
    if (X && Y) {
      if (type === "regression") {
        axios.post('http://localhost:5000/graph/regression', {
          X: X,
          Y: Y,
        }).then(response => {
          setData(response.data.data)
          setLayout(response.data.layout)
        })
      }
      else if (type === "timeseries") {
        axios.post('http://localhost:5000/graph/timeseries', {
          X: X,
          Y: Y,
        }).then(response => {
          setData(response.data.data)
          setLayout(response.data.layout)
        })
      }
      else if (type === "jointplot") {
        axios.post('http://localhost:5000/graph/jointplot', {
          X: X,
          Y: Y,
        }).then(response => {
          setData(response.data.data)
          setLayout(response.data.layout)
        })
      }
      else if (type === "correlation") {
        axios.get(`http://localhost:5000/graph/correlation/${file_name}`)
          .then(response => {
            console.log(response.data)
            setData(response.data.data)
            setLayout(response.data.data)
          }
          )
      }
    }
  }, [type, X, Y, file_name])

  return (
    <div className="container mx-auto">
      {type !== "pairplot" ?
        <Plot data={data} layout={layout} />
        :
        <img src={`http://localhost:5000/graph/pairplot/${file_name}`} alt="pairplot goes here"></img>
      }
    </div>

  )
}

export default Graph;
