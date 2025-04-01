import React from "react";
import "./LogoutButtonp.css";

const LogoutButtonp: React.FC = () => {
  const handleLogout = () => {
    // Ici tu peux ajouter ta logique de déconnexion
    console.log("User logged out");
  };

  return (
    <button className="logout-buttonp" onClick={handleLogout}>
      Log out
    </button>
  );
};

export default LogoutButtonp;
