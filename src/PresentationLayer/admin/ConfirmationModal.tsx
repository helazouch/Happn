import React from "react";
import "./ConfirmationModal.css";

interface ConfirmationModalProps {
  show: boolean;
  onConfirm: () => Promise<void>; // Updated to async
  onCancel: () => void;
  formData: {
    place: string;
    date: string;
    capacity: number;
    price: number;
    selectedCategories: string[];
  };
  isLoading: boolean; // Add this line
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  onConfirm,
  onCancel,

  isLoading, // Add this prop
}) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="confirmation-modal">
        <h2>Confirm Event Details</h2>
        <div className="modal-content">{/* ... existing modal rows ... */}</div>
        <div className="modal-buttons">
          <button
            className="confirm-button"
            onClick={onConfirm}
            disabled={isLoading} // Disable during loading
          >
            {isLoading ? "Processing..." : "Confirm"}
          </button>
          <button
            className="cancel-button"
            onClick={onCancel}
            disabled={isLoading} // Disable during loading
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
