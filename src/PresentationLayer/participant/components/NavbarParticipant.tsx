import React, { useState } from "react";
import "./NavbarParticipant.css";
import LogoutButtonP from "../../common/components/LogoutButton";
import profileIcon from "/profile.png"; // Adjust path to your image
import { useNavigationServiceParticipantNavBar } from "../../../RoutingLayer/navigation/NavigationServiceParticipantNavBar";

const NavbarParticipant: React.FC = () => {

  const navigation = useNavigationServiceParticipantNavBar();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.png" alt="Logo" />
      </div>

      <div className="navbar-links-container">
        <ul className="navbar-links">
          <li onClick={navigation.goToEvents}>Events</li>
          <li onClick={navigation.goToProfile}>Profile</li>
          <li onClick={navigation.goToParticipation}>Participation</li>
        </ul>
        <div className="navbar-links-underline"></div>
      </div>

      <div className="navbar-right">
        <div className="navbar-logout">
          <LogoutButtonP />
        </div>
        <div
          className="profile-button"
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
        >
          <img
            className="profile-boutton-img"
            src={profileIcon}
            alt="Profile"
          />
          {showProfileDropdown && (
            <div className="profile-dropdown">
              <div className="dropdown-item">Username</div>
              <div className="dropdown-item">My Account</div>
              <div className="dropdown-item">Sign Out</div>
              <div className="dropdown-item">Participation</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarParticipant;
