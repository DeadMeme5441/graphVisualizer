import React from 'react'

import Graphboard from './Graphboard'

const GraphboardList = ({ file_name }) => {

  const [dash, setDash] = React.useState([<Graphboard file_name={file_name} />])

  const addHandler = () => {
    setDash([...dash, <Graphboard file_name={file_name} />])
  }

  const removeHandler = () => {
    let temp = [...dash]
    temp.pop()
    setDash(temp)
  }

  return (
    <div>
      {
        dash.map(obj => {
          return (
            obj
          )
        })
      }
      <div className="flex flex-row justify-center gap-6">
        <button className="bg-black text-white font-bold py-2 px-4 rounded" onClick={addHandler}>Add Dash</button>
        <button className="bg-black text-white font-bold py-2 px-4 rounded" onClick={removeHandler}>Remove Dash</button>
      </div>
    </div>
  )
}

export default GraphboardList;
