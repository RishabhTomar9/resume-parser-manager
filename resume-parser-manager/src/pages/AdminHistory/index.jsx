import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

const AdminHistory = ({ user }) => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/resumes', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setResumes(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [user.token]);

  return (
    <div className="admin-history">
      <h2>All Uploaded Resumes</h2>
      {resumes.length === 0 ? (
        <p>No uploads yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Skills</th>
              <th>Experience</th>
              <th>Uploaded By</th>
            </tr>
          </thead>
          <tbody>
            {resumes.map((resume, index) => (
              <tr key={index}>
                <td>{resume.name}</td>
                <td>{resume.email}</td>
                <td>{resume.skills.join(', ')}</td>
                <td>{resume.experience}</td>
                <td>{resume.uploadedBy?.email || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminHistory;
