import React from 'react';
import './LogoutButton.css';

const LogoutButton: React.FC = () => {
  const handleSignUp = () => {
    // Ici tu peux ajouter ta logique de déconnexion
    console.log('User sign up');
  };

  return (
    <button className="logout-button" onClick={handleSignUp}>
      Sign Up
    </button>
  );
};

export default LogoutButton;