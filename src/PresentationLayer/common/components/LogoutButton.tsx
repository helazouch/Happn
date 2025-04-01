import React from 'react';
import './LogoutButton.css';
import { useNavigationServiceStart } from '../../../RoutingLayer/navigation/NavigationServiceStart';

const LogoutButton: React.FC = () => {
  const navigation=useNavigationServiceStart();
  return (
    <button className="logout-button" onClick={navigation.goToLandingPage}>
      Log out
    </button>
  );
};

export default LogoutButton;


