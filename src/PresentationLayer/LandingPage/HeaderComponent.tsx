import "./HeaderComponent.css";

const HeaderComponent = () => {
  return (
    <header className="page-header">
      <div className="header-container">
        {/* Logo on the left */}
        <div className="logo-container">
          <a href="/">
            <img src="logo.png" alt="Company Logo" className="logo" />
          </a>
        </div>

        {/* Navigation links */}
        <nav className="nav-container">
          <div className="nav-links">
            <a href="/" className="nav-link">
              Home
            </a>
            <a href="#events" className="nav-link">
              Events
            </a>
            <a href="#about" className="nav-link">
              About Us
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </div>

          {/* Auth buttons */}
          <div className="auth-buttons">
            <a href="#login" className="login-link">
              Login
            </a>
            <a href="#signup" className="signup-button">
              Sign Up
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default HeaderComponent;
