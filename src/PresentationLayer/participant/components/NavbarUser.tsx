import React from "react";
import "./NavbarUser.css";
import LogoutButton from "../../common/components/LogoutButton";
import { useNavigationServiceAdminNavBar } from "../../../RoutingLayer/navigation/NavigationServiceAdminNavBar";

const Navbar: React.FC = () => {
  const navigation = useNavigationServiceAdminNavBar();
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.png" alt="Logo" />
      </div>
      <ul className="navbar-links">
        <li onClick={navigation.goToStatistics}>Events</li>
        <li onClick={navigation.goToEvents}>Profile</li>
        <li onClick={navigation.goToClientFile}>Participation</li>
      </ul>
      <div className="navbar-logout">
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;
