import React from 'react'

import Upload from './Upload'

import FileContext from '../FileContext'

const NavBar = () => {

  const myContext = React.useContext(FileContext)

  const [currentFile, setCurrentFile] = React.useState(myContext.currentFile)

  React.useEffect(() => {
    setCurrentFile(myContext.currentFile)
  }, [myContext.currentFile])

  return (
    <div className="flex flex-col">
      <div className="font-sans flex flex-row text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
        <div className="mb-2 sm:mb-0">
          Enova
        </div>
        <div>
          <Upload />
        </div>
      </div>
      <div className="flex flex-row justify-left px-6 py-4">
        <div className="flex flex-row justify-center">
          <div className="flex text-black font-bold">Dashboard</div>
          <svg xmlns="http://www.w3.org/2000/svg" className="m-auto h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          {currentFile ?
            <div className="flex">
              {currentFile}
            </div>
            : <div>No File Selected.</div>}
        </div>
      </div>
    </div>
  )
}

export default NavBar;
