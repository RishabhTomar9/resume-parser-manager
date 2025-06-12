import React from 'react';
import ResumeUpload from '../../components/ResumeUpload';
import ResumeList from '../../components/ResumeList';
import './index.css';

const Dashboard = ({ user }) => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Resume Parser Dashboard</h2>
      
      <div className="upload-section">
        <ResumeUpload user={user} />
      </div>

      <div className="list-section">
        <h3>Parsed Resumes</h3>
        <ResumeList user={user} />
      </div>
    </div>
  );
};

export default Dashboard;
