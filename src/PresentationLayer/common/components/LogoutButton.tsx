import React from 'react';
import './LogoutButton.css';

const LogoutButton: React.FC = () => {
  const handleLogout = () => {
    // Ici tu peux ajouter ta logique de déconnexion
    console.log('User logged out');
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Log out
    </button>
  );
};

export default LogoutButton;


