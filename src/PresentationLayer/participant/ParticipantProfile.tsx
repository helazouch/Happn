// import React, { useState } from 'react';
// import './Statistics.css';
import NavbarParticipant from "./components/NavbarParticipant"
import ProfileSettings from "./components/ProfileSettings";
// import Notifications from './components/Notifications';
// import AxesSelector from './components/AxesSelector';
// import Chart from './components/Chart';

const ParticipantProfile = () => {
  const isAuthenticated = sessionStorage.getItem("connexion");
    if (!isAuthenticated || isAuthenticated.trim() === "") {
      return (
        <div style={{ textAlign: "center", marginTop: "100px", fontSize: "24px", color: "red" }}>
          Accès non autorisé
        </div>
      );
    }
  return (
    <>
      <NavbarParticipant />
      <ProfileSettings></ProfileSettings>
    </>
  );
};

export default ParticipantProfile;
