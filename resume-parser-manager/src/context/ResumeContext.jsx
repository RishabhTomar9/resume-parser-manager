import React, { createContext, useState } from 'react';

export const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumes, setResumes] = useState([]);
  const [history, setHistory] = useState([]);

  const addResume = (resume) => {
    setResumes(prev => [...prev, resume]);
    setHistory(prev => [...prev, { ...resume, uploadedAt: new Date().toLocaleString() }]);
  };

  return (
    <ResumeContext.Provider value={{ resumes, addResume, history }}>
      {children}
    </ResumeContext.Provider>
  );
};
