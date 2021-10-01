import React from 'react';
import axios from 'axios'

import GraphboardList from './GraphboardList'

const FileNav = () => {

  const [fileList, setFileList] = React.useState([])
  const [tabList, setTabList] = React.useState([])
  const [activeFile, setActiveFile] = React.useState(null)


  React.useEffect(() => {
    axios.get("http://localhost:5000/files").then((response) => {
      setFileList(response.data.files)
    })
  }, [])

  const activeFileHandler = (e) => {
    setActiveFile(e.target.value)
  }

  const addFileHandler = (e) => {
    let tab_list = [...tabList]
    if (!tabList.includes(e.target.innerHTML)) {
      tab_list.push(e.target.innerHTML)
      setActiveFile(e.target.innerHTML)
    }
    else {
      setActiveFile(e.target.innerHTML)
    }
    setTabList(tab_list)
  }

  const removeTabHandler = (e) => {
    let tab_list = [...tabList]
    tab_list.pop(e)
    setTabList(tab_list)
    if (tabList.length === 0) {
      setActiveFile(null)
    }
    else {
      setActiveFile(tab_list.at(-1))
    }
  }

  if (!fileList && !activeFile) {
    return (
      <div className="container">
        <nav className="flex flex-col sm:flex-row">
          <p>
            No files loaded.
          </p>
        </nav>
      </div>
    )
  }

  return (
    <div className="flex flex-row gap-4">
      <div className="container max-w-max" >
        <div className="border-black border-b-2 font-semibold py-4 px-6 text-center">
          File Directory
        </div>
        <nav className="flex flex-row">
          {
            fileList.map((file) => {
              return (
                <button className="text-gray-600 py-4 px-6 block hover:text-black focus:outline-none" onClick={addFileHandler}>{file}</button>
              )
            })
          }
        </nav>
      </div>
      <div className="container">
        <nav className="flex flex-col sm:flex-row">
          {
            tabList.map((file) => {
              return (
                file !== activeFile ?
                  <div className="flex flex-row hover:text-blue-500 focus:outline-none">
                    <button className="text-gray-600 py-4 px-6 block" onClick={activeFileHandler}>{file}</button>
                    <div className="flex items-center" onClick={() => removeTabHandler({ file })} >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                  :
                  <div className="flex flex-row border-b-2 border-blue-500">
                    <button className="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 font-medium "> {file}</button>
                    <div className="flex items-center" onClick={() => removeTabHandler({ file })} >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
              )
            })
          }
        </nav>
        <nav className="flex flex-col sm:flex-row">
          {tabList.length === 0 ?
            <button className="text-gray-600 py-4 px-6 block focus:outline-none font-medium text-center" onClick={activeFileHandler}>No Files Loaded.</button>
            : <></>
          }
        </nav>
        {activeFile ?
          < GraphboardList file_name={activeFile} />
          :
          <div className="container text-center h-3/4">No file loaded.</div>
        }
      </div>
    </div >
  )

}

export default FileNav
