import React from "react";
import axios from "axios";

import Graph from './Graph'

const Graphboard = ({ file_name }) => {

  const [jsonData, setJsonData] = React.useState(null);
  const [cols, setCols] = React.useState([])
  const [currentX, setCurrentX] = React.useState([])
  const [currentY, setCurrentY] = React.useState([])
  const [type, setType] = React.useState(null)

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/json/" + file_name.split('.')[0])
      .then(response => {
        setJsonData(response.data)
        setCols(response.data.data.map(obj => {
          return obj.colName
        }))
        setCurrentX(response.data.data[2])
        setCurrentY(response.data.data[1])
        setType('regression')
      })
  }, [file_name]);


  if (!jsonData) return <div>No graph or columns loaded.</div>;

  const xSelectHandler = (e) => {
    if (!e.target) {
      setCurrentX(jsonData.data.filter(obj => obj.colName.trim() === e.trim()))
    }
    else {
      setCurrentX(jsonData.data.filter(obj => obj.colName.trim() === e.target.value.trim()))
    }
  }

  const ySelectHandler = (e) => {
    if (!e.target) {
      setCurrentY(jsonData.data.filter(obj => obj.colName.trim() === e.trim()))
    }
    else {
      setCurrentY(jsonData.data.filter(obj => obj.colName.trim() === e.target.value.trim()))
    }
  }

  const typeHandler = (e) => {
    if (e.target.value === "Regression") {
      setType("regression")
      xSelectHandler(jsonData.data[2].colName)
      ySelectHandler(jsonData.data[1].colName)
    }
    else if (e.target.value === "Time Series") {
      setType("timeseries")
      xSelectHandler(jsonData.data[0].colName)
      ySelectHandler(jsonData.data[2].colName)
    }
    else if (e.target.value === "Joint Plot") {
      setType("jointplot")
      xSelectHandler(jsonData.data[2].colName)
      ySelectHandler(jsonData.data[1].colName)
    }
  }

  return (
    <div className="flex flex-row justify-center space-x-10">
      <div className="flex flex-col space-y-10 justify-center">
        <div className="flex flex-col">
          <h4 className="container pt-5 pb-5">Choose Type.</h4>
          <div className="flex justify-center">
            <select className="w-full border border-gray-300 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none" onChange={typeHandler}>
              <option>Regression</option>
              <option>Time Series</option>
              <option>Joint Plot</option>
            </select>
          </div>
        </div>
        <div className="flex flex-row space-x-10">
          {type !== "timeseries" ? <div className="block">
            <h4 className="container pt-5 pb-5 justify-self-center">Choose X column.</h4>
            <div className="container inline-flex">
              <select className="border border-gray-300 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none" onChange={xSelectHandler}>
                <option selected disabled hidden>Select X.</option>
                {
                  cols.map(col => {
                    return (
                      col === "datetime" ?
                        <></> : <option>{col}</option>
                    )
                  })
                }
              </select>
            </div>
          </div> : <> </>}
          <div className="block">
            <h4 className="container pt-5 pb-5">Choose Y column.</h4>
            <div className="container inline-flex">
              <select className="border border-gray-300 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none" onChange={ySelectHandler}>
                <option selected disabled hidden>Select Y.</option>
                {
                  cols.map(col => {
                    return (
                      col === "datetime" ?
                        <></> : <option>{col}</option>
                    )
                  })
                }
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="block mx-auto mt-5">
        <Graph type={type} X={currentX[0]} Y={currentY[0]} />
      </div>
    </div>
  );
};

export default Graphboard;
