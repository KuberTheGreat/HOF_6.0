import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

const App = () => {

  const [showForm, setShowForm] = useState(false);

  const openGrievanceForm = () => {
    setShowForm(true);
  };

  return (
    <div className="app-container">
      <Sidebar openGrievanceForm={openGrievanceForm} />
      <div className="main-content">
       
        <Outlet context={{ showForm, setShowForm }} />
      </div>
    </div>
  );
};

export default App;
