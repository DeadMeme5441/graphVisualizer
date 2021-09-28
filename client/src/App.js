import React from 'react';
import DashboardList from './components/Dashboard/DashboardList';
import NavBar from './components/NavBar/NavBar'

function App() {


  return (
    <div className="container mx-auto flex flex-col">
      <NavBar />
      <DashboardList />
    </div>
  );
}

export default App;
