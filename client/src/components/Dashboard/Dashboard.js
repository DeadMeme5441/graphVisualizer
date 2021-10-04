import React from 'react';

import FileContext from '../FileContext'

import Upload from '../NavBar/Upload'
import GraphboardList from './GraphboardList'

const Dashboard = () => {

  const myContext = React.useContext(FileContext)

  const [activeFile, setActiveFile] = React.useState(null)

  React.useEffect(() => {
    setActiveFile(myContext.currentFile)
  }, [myContext.currentFile])


  if (!activeFile) {
    return (
      <div className="flex flex-col pt-64 gap-4">
        <div className="flex flex-row justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="my-auto h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-3xl">
            No file loaded.
          </div>
        </div>
        <div className="flex self-center mt-4">
          <Upload />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-row">
      <div className="container">
        <GraphboardList file_name={activeFile} />
      </div>
    </div >
  )

}

export default Dashboard
