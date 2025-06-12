import React, { useState, useEffect } from 'react';
import ResumeCard from '../ResumeCard';
import Filters from '../Filters';
import './index.css';
import { api } from '../../utils/axios';

const ResumeList = ({ user }) => {
  const [resumes, setResumes] = useState([]);
  const [filter, setFilter] = useState('');

  const fetchResumes = async () => {
    try {
      const res = await api(user.token).get('/resumes');
      setResumes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResumes();
  });

  const filteredResumes = resumes.filter(
    r => r.name.toLowerCase().includes(filter.toLowerCase()) || r.skills.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="resumelist-container">
      <Filters filter={filter} setFilter={setFilter} />
      <div className="resumelist-grid">
        {filteredResumes.map((resume, idx) => (
          <ResumeCard key={idx} resume={resume} />
        ))}
      </div>
    </div>

  );
};

export default ResumeList;
