import React from 'react';

import NavBar from './components/NavBar/NavBar'
import Dashboard from './components/Dashboard/Dashboard';

function App() {


  return (
    <div className="container mx-auto flex flex-col">
      <NavBar />
      <Dashboard />
    </div>
  );
}

export default App;
