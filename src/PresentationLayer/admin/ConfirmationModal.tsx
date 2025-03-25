import React from "react";
import "./ConfirmationModal.css";

interface ConfirmationModalProps {
  show: boolean;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  formData: {
    place: string;
    date: string;
    capacity: number;
    price: number;
    selectedCategories: string[];
  };
  isLoading: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  onConfirm,
  onCancel,
  formData,
  isLoading,
}) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="confirmation-modal">
        <h2 className="modal-title">Confirm Event Creation</h2>
        <div className="modal-content">
          <div className="detail-row">
            <span>Place:</span>
            <span>{formData.place || "Not specified"}</span>
          </div>
          <div className="detail-row">
            <span>Date:</span>
            <span>{formData.date || "Not specified"}</span>
          </div>
          <div className="detail-row">
            <span>Capacity:</span>
            <span>{formData.capacity} people</span>
          </div>
          <div className="detail-row">
            <span>Price:</span>
            <span>{formData.price} €</span>
          </div>
          <div className="detail-row">
            <span>Categories:</span>
            <span>
              {formData.selectedCategories.length > 0
                ? formData.selectedCategories.join(", ")
                : "No categories selected"}
            </span>
          </div>
        </div>
        <div className="modal-message">
          Oops! Looks like this event already exists. Want to add the next version?
        </div>
        <div className="modal-buttons">
          <button
            className="confirm-button"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Yes"}
          </button>
          <button
            className="cancel-button"
            onClick={onCancel}
            disabled={isLoading}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;