import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ openGrievanceForm }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
   
    localStorage.removeItem('token');

    navigate('/login');
  };

  return (
    <div className="sidebar">
      <h2>User Dashboard</h2>
      <ul>
        <li>ChatBot</li>
        <li onClick={openGrievanceForm} style={{ cursor: 'pointer' }}>
          Submit Grievance
        </li>
        <li>Profile</li>
        <li>Settings</li>
        <li onClick={handleLogout} style={{ cursor: 'pointer', color: '#ff4d4f' }}>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
