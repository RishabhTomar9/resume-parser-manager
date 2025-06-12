import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Header = () => (
  <header className="header">
    <h1>Resume Parser & Manager</h1>
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="/history">Upload History</Link>
    </nav>
  </header>
);

export default Header;
