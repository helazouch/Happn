import React from 'react';
import './Navbar.css';
import LogoutButton from '../../common/components/LogoutButton';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src='/logo.png' alt="Logo" />
      </div>
      <ul className="navbar-links">
        <li>Statistics</li>
        <li>Events</li>
        <li>Client File</li>
      </ul>
      <div className="navbar-logout">
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;

