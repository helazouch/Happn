import "./DeleteConfirmationModal.css";

type DeleteConfirmationModalProps = {
    show: boolean;
    onConfirm: () => void;
    onCancel: () => void;
  };
  
  const DeleteConfirmationModal = ({
    show,
    onConfirm,
    onCancel,
  }: DeleteConfirmationModalProps) => {
    if (!show) return null;
  
    return (
      <div className="modal-overlay">
        <div className="confirm-modal">
          <h2>Are you sure you want to cancel this event?</h2>
          <div className="modal-actions">
            <button className="confirm-btn" onClick={onConfirm}>
              Yes
            </button>
            <button className="cancel-btn" onClick={onCancel}>
              No
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteConfirmationModal;
  