import React from 'react';
import './index.css';

const ResumeCard = ({ resume }) => (
  <div className="resume-card">
    <h3>{resume.name}</h3>
    <p><strong>Skills:</strong> {resume.skills}</p>
    <p><strong>Experience:</strong> {resume.experience}</p>
  </div>
);

export default ResumeCard;
