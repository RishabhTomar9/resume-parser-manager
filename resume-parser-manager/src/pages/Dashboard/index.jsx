import React from 'react';
import ResumeUpload from '../../components/ResumeUpload';
import ResumeList from '../../components/ResumeList';
import './index.css';

const Dashboard = ({ user }) => {
  return (
    <div>
      <ResumeUpload user={user} />
      <ResumeList user={user} />
    </div>
  );
};

export default Dashboard;
