import { useState } from "react";
import { FaUser, FaExclamationTriangle } from "react-icons/fa";
import "./ProfileSettings.css";

const ProfileSettings = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    // Add your account deletion logic here
    console.log("Account deletion confirmed");
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
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
              <input type="email" id="email" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
            </div>

            <div className="btn-container">
              <button type="button" className="modify-btn">
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
