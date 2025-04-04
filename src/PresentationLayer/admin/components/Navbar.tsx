import React, { useEffect } from 'react';
import './Navbar.css';
import LogoutButton from '../../common/components/LogoutButton';
import { useNavigationServiceAdminNavBar } from '../../../RoutingLayer/navigation/NavigationServiceAdminNavBar';

const Navbar: React.FC = () => {
  const navigation = useNavigationServiceAdminNavBar();
  const [activeTab, setActiveTab] = React.useState<string>('');

  // Synchronisation avec la navigation actuelle
  useEffect(() => {
    // Détermine l'onglet actif basé sur l'URL ou la logique métier
    const path = window.location.pathname;
    if (path.includes('statistics')) setActiveTab('Statistics');
    else if (path.includes('events')) setActiveTab('Events');
    else if (path.includes('client')) setActiveTab('Client File');
  }, []);

  // Gestion robuste des clics
  const handleTabClick = (tabName: string, navigationFn: () => Promise<void> | void) => {
    setActiveTab(tabName); // Met à jour IMMÉDIATEMENT l'UI
    try {
      navigationFn(); // Lance la navigation
    } catch (error) {
      console.error('Navigation failed:', error);
      setActiveTab(''); // Réinitialise en cas d'erreur
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src='/logo.png' alt="Logo" />
      </div>
      <ul className="navbar-links">
        <li
          className={activeTab === 'Statistics' ? 'active' : ''}
          onClick={() => handleTabClick('Statistics', navigation.goToStatistics)}
        >
          Statistics
        </li>
        <li
          className={activeTab === 'Events' ? 'active' : ''}
          onClick={() => handleTabClick('Events', navigation.goToEvents)}
        >
          Events
        </li>
        <li
          className={activeTab === 'Client File' ? 'active' : ''}
          onClick={() => handleTabClick('Client File', navigation.goToClientFile)}
        >
          Client File
        </li>
      </ul>
      <div className="navbar-logout">
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;