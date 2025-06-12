import React, { useState } from 'react';
import './index.css';
import { api } from '../../utils/axios';

const ResumeUpload = ({ user }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert('Select file first');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await api(user.token).post('/resumes/upload', formData);
      alert('Resume parsed & uploaded successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to upload');
    }
  };

  return (
    <div className="upload-container">
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload & Parse</button>
    </div>
  );
};

export default ResumeUpload;
