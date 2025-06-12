import React, { useEffect } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import './index.css';

const GoogleAuth = ({ setUser, user }) => {

  const handleLoginSuccess = async (credentialResponse) => {
    const credential = credentialResponse.credential;
    const decodedToken = JSON.parse(atob(credential.split('.')[1]));
    setUser({ token: credential, ...decodedToken });
    localStorage.setItem('resume_user', JSON.stringify({ token: credential, ...decodedToken }));
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem('resume_user');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('resume_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className="auth-container">
      {user ? (
        <div className="welcome-box">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
          <h3>Welcome, {user.name} 👋</h3>
          <p>{user.email}</p>
        </div>
      ) : (
        <div className="login-box">
          <h2>Login to Resume Parser</h2>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => console.log('Login Failed')}
          />
        </div>
      )}
    </div>
  );
};

export default GoogleAuth;
