import React, { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext';
import './index.css';

const AdminHistory = () => {
  const { history } = useContext(ResumeContext);
  return (
    <div className="container">
      <h2>Upload History</h2>
      <ul className="history-list">
        {history.map((item, idx) => (
          <li key={idx}>
            <b>{item.name}</b> uploaded at {item.uploadedAt}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminHistory;
