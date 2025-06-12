import React, { useEffect } from 'react';
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

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
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => console.log('Login Failed')}
        />
      )}
    </div>
  );
};

export default GoogleAuth;
