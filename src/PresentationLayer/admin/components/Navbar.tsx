import React from 'react';
import './Navbar.css';
import LogoutButton from '../../common/components/LogoutButton';
import { useNavigationServiceAdminNavBar } from '../../../RoutingLayer/navigation/NavigationServiceAdminNavBar';

const Navbar: React.FC = () => {
  const navigation = useNavigationServiceAdminNavBar();
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src='/logo.png' alt="Logo" />
      </div>
      <ul className="navbar-links">
        <li onClick={navigation.goToStatistics}>Statistics</li>
        <li onClick={navigation.goToEvents}>Events</li>
        <li onClick={navigation.goToClientFile}>Client File</li>
      </ul>
      <div className="navbar-logout">
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;

