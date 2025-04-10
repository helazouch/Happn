import React, { useState , useEffect} from "react";
import "./NavbarParticipant.css";
import LogoutButtonP from "../../common/components/LogoutButton";
import profileIcon from "/profile.png"; // Adjust path to your image
import { useNavigationServiceParticipantNavBar } from "../../../RoutingLayer/navigation/NavigationServiceParticipantNavBar";

const NavbarParticipant: React.FC = () => {

  const navigation = useNavigationServiceParticipantNavBar();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('');
  // Synchronisation de l'onglet actif selon l'URL ou la logique métier
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('Events')) setActiveTab('Events');
    else if (path.includes('profile')) setActiveTab('Profile');
    else if (path.includes('participation')) setActiveTab('participation');
  }, []);

  // Gestion des clics sur les onglets
const handleTabClick = (tabName: string, navigationFn: () => Promise<void> | void) => {
  setActiveTab(tabName); // Mise à jour immédiate de l'UI
  try {
    navigationFn(); // Lancement de la navigation
  } catch (error) {
    console.error('Navigation failed:', error);
    setActiveTab(''); // Réinitialisation en cas d'erreur
  }
};

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.png" alt="Logo" />
      </div>

      <div className="navbar-links-container">
      <ul className="navbar-links">
        <li
          className={activeTab === 'Events' ? 'active' : ''}
          onClick={() => handleTabClick('Events', navigation.goToEvents)}
        >
          Events
        </li>
        <li
          className={activeTab === 'Profile' ? 'active' : ''}
          onClick={() => handleTabClick('Profile', navigation.goToProfile)}
        >
          Profile
        </li>
        <li
          className={activeTab === 'participation' ? 'active' : ''}
          onClick={() => handleTabClick('participation', navigation.goToParticipation)}
        >
          Participation
        </li>
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
