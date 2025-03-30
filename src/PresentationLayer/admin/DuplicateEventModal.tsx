import React from "react";
import "./DuplicateEventModal.css";

interface DuplicateEventModalProps {
  show: boolean;
  onYes: () => void;
  onNo: () => void;
  isLoading?: boolean;
  eventName: string; 
}

const DuplicateEventModal: React.FC<DuplicateEventModalProps> = ({
  show,
  onYes,
  onNo,
  isLoading = false,
  eventName, 
}) => {
  if (!show) return null;

  return (
    <div className="dem-overlay">
      <div className="dem-modal">
        <div className="dem-message">
          Oops! Looks like "<strong>{eventName}</strong>" already exists. 
          Want to add the next version?
        </div>
        {/* Le reste du code reste inchangé */}
        <div className="dem-buttons">
          <button
            className="dem-button dem-yes"
            onClick={onYes}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Yes"}
          </button>
          <button
            className="dem-button dem-no"
            onClick={onNo}
            disabled={isLoading}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DuplicateEventModal;