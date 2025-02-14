import React, { useState } from 'react';

const MyGrievances = () => {
  const [grievances, setGrievances] = useState([
    { id: '#101', title: 'Issue with service', date: '2025-02-01', status: 'Pending', attachment: null },
    { id: '#102', title: 'Billing error',       date: '2025-02-02', status: 'Pending', attachment: null },
    { id: '#103', title: 'Website downtime',    date: '2025-02-03', status: 'In Review', attachment: null },
  ]);

  const totalGrievances = 3;
  const resolvedCount = 1;
  const pendingCount = 2;


  const [showForm, setShowForm] = useState(false);


  const [newTitle, setNewTitle] = useState('');
  const [attachment, setAttachment] = useState(null);

  
  const nextId = `#10${grievances.length + 1}`;

  
  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date().toISOString().split('T')[0];

    const newGrievance = {
      id: nextId,
      title: newTitle,
      date: currentDate,
      status: 'In Review',
      attachment: attachment,
    };

    setGrievances([...g, newGrievance]);

    setNewTitle('');
    setAttachment(null);
    setShowForm(false);
  };

  return (
    <div className="grievances-container">
      <div className="header-row">
        <h1>My Grievances</h1>
        <button className="new-grievance-btn" onClick={() => setShowForm(!showForm)}>
          Submit New Grievance
        </button>
      </div>

      <div className="cards-row">
        <div className="card total">
          <h2>{totalGrievances}</h2>
          <p>Total Grievances</p>
        </div>
        <div className="card resolved">
          <h2>{resolvedCount}</h2>
          <p>Resolved</p>
        </div>
        <div className="card pending">
          <h2>{pendingCount}</h2>
          <p>Pending</p>
        </div>
      </div>

      <h2 className="details-heading">Grievance Details</h2>

    
      <table className="grievance-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Date</th>
            <th>Status</th>
            <th>Attachment</th>
          </tr>
        </thead>
        <tbody>
          {grievances.map((g, index) => (
            <tr key={index}>
              <td>{g.id}</td>
              <td>{g.title}</td>
              <td>{g.date}</td>
              <td>
                <span className={`status-badge ${g.status.toLowerCase().replace(' ', '-')}`}>
                  {g.status}
                </span>
              </td>
              <td>{g.attachment ? g.attachment.name : 'None'}</td>
            </tr>
          ))}
        </tbody>
      </table>

     
      {showForm && (
        <div className="form-container">
          <h3>Submit a New Grievance</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Attachment (Image or Video)</label>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
              />
            </div>
            <button type="submit">Add Grievance</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyGrievances;
