import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AdminHistory from './pages/AdminHistory';
import { ResumeProvider } from './context/ResumeContext';
import Header from './components/Header';
import GoogleAuth from './components/GoogleAuth';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <ResumeProvider>
      <BrowserRouter>
        <Header />
        <div className="container">
          <GoogleAuth setUser={setUser} user={user} />
          {user && (
            <Routes>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/history" element={<AdminHistory />} />
            </Routes>
          )}
        </div>
      </BrowserRouter>
    </ResumeProvider>
  );
};

export default App;
