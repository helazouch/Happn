import { useEffect, useState } from "react";
import { FaUser, FaExclamationTriangle } from "react-icons/fa";
import "./ProfileSettings.css";
import { getAuth } from "firebase/auth";
import { AuthService } from "../../../ServiceLayer/authentication/AuthService";
import { useNavigationServiceStart } from "../../../RoutingLayer/navigation/NavigationServiceStart";

const ProfileSettings = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [email, setEmail] = useState("");
  const [connexion, setConnexion] = useState(""); // 1: email, 2: google
  const [password, setPassword] = useState("");
  const [oldPassword, setoldPassword] = useState("");
  const navigation=useNavigationServiceStart();
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail") || "";
    const storedConnexion = sessionStorage.getItem("connexion") || "";
    setEmail(storedEmail);
    setConnexion(storedConnexion);
  }, []);

  const handleConfirmDelete = async () => {
    // Add your account deletion logic here
    try {
      await AuthService.deleteCurrentUser();
      // Rediriger vers la page de login ou d'accueil
      alert("Account deletion confirmed");
      console.log("Account deletion confirmed");
      navigation.goToLandingPage();
    } catch (error) {
      alert("erreur lors de la suppression du compte");
      setShowDeleteModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };
  const handleModify = async () => {
    if (connexion === "1") {
      // Email/password account, so we allow password change
      console.log("New password:", password);
      // Appelle ici Firebase Auth pour mettre à jour le mot de passe
    } 
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        alert("No user is currently logged in.");
        return;
      }
  
      await AuthService.updatePasswordForEmailUser(user, oldPassword, password);
      alert("Password updated successfully.");
      setPassword("");
      setoldPassword("");
    } catch (error) {
      alert("Failed to update password: ");
    }
  };

  return (
    <div className="settings-wrapper">
      <div className="settings-container">
        {/* Column 1 - Form Section */}
        <div className="settings-column form-section">
          <div className="section-header">
            <FaUser className="section-icon" />
            <h2>Informations Personelle</h2>
          </div>

          <form className="profile-form">
            {/* <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" />
            </div> */}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={email} readOnly />
            </div>

            <div className="form-group">
              <label htmlFor="password">Current Password</label>
              <input type="password" id="password" value={oldPassword}
                onChange={(e) => setoldPassword(e.target.value)}/>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="btn-container">
              <button type="button" className="modify-btn" onClick={handleModify}>
                Modify
              </button>
            </div>
          </form>
        </div>

        {/* Column 2 - Danger Zone */}
        <div className="settings-column danger-zone">
          <div className="section-header">
            <FaExclamationTriangle className="section-icon" />
            <h2>Danger Zone</h2>
          </div>

          <div className="warning-message">
            <p>
              <strong>Warning:</strong> Account Deletion is Permanent. You will
              lose all your data and need a new account to return.
            </p>
            <p>
              If you only want to cancel your subscription, please use the "Edit
              Billing Detail" button instead of deleting your account.
            </p>
          </div>

          <div className="btn-container">
            <button
              type="button"
              className="delete-btn"
              onClick={handleDeleteClick}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h3>Are you sure you want to delete your account?</h3>
            <div className="modal-buttons">
              <button className="modal-cancel-btn" onClick={handleCancelDelete}>
                No
              </button>
              <button
                className="modal-confirm-btn"
                onClick={handleConfirmDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;
