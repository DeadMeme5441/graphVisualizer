import React from 'react';

import Dashboard from './components/Dashboard/Dashboard';
import NavBar from './components/NavBar/NavBar'

function App() {


  return (
    <div className="container mx-auto flex flex-col">
      <NavBar />
      <Dashboard />
    </div>
  );
}

export default App;
