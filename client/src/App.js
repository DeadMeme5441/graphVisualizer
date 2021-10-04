import React from 'react';

import FileContext from "./components/FileContext"

import NavBar from './components/NavBar/NavBar'
import Dashboard from './components/Dashboard/Dashboard';

function App() {

  const [currentFile, setCurrentFile] = React.useState(null)

  const globalVars = {
    currentFile: currentFile,
    setCurrentFile: setCurrentFile
  }

  return (
    <FileContext.Provider value={globalVars}>
      {
        <div className="container mx-auto flex flex-col">
          <NavBar />
          <Dashboard />
        </div>
      }
    </FileContext.Provider>
  );
}

export default App;
