import React from 'react'

import Dashboard from './Dashboard'

const DashboardList = () => {

  const [dash, setDash] = React.useState([<Dashboard />])

  const addHandler = () => {
    setDash([...dash, <Dashboard />])
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

export default DashboardList;
