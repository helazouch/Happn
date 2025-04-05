import { useState, useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { doc, updateDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../../ServiceLayer/firebase/firebaseConfig";
import "./UploadInvoiceModal.css";
import { uploadImage } from "../../ServiceLayer/cloudinary/imageUpload";

interface UploadInvoiceModalProps {
  participation: { id: string };
  onClose: () => void;
}

const UploadInvoiceModal: React.FC<UploadInvoiceModalProps> = ({
  participation,
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [uploadTask, setUploadTask] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const storage = getStorage();

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
  
    try {
      // 🆕 Utilisation de Cloudinary pour l'upload au lieu de Firebase Storage
      const downloadURL = await uploadImage(file);
  
      // 🆕 Mettre à jour Firestore avec l'URL de Cloudinary au lieu de Firebase Storage
      await updateDoc(doc(db, "participations", participation.id), {
        paymentSubmitted: true,
        status: "pending_payment",
        paymentProofUrl: downloadURL, // 🆕 URL récupérée depuis Cloudinary
      });
  
      console.log(`File uploaded to Cloudinary: ${file.name}`);
      alert (downloadURL);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
      onClose(); // Fermer la modal après l'upload
    }
  };

  const handleCancel = () => {
    if (uploadTask) {
      uploadTask.cancel(); // Stop upload
      console.log("Upload canceled");
    }
    setUploading(false);
    onClose(); // Close modal immediately
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Upload Invoice</h2>

        <div
          className="file-upload-container"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            ref={fileInputRef}
            className="file-input"
          />
          <label className="file-upload-label">
            <FiUploadCloud className="upload-icon" />
            <span className="upload-text">Drag & drop or click to upload</span>
            <span className="upload-hint">(JPG, PNG, PDF)</span>
            {file && <div className="file-name">{file.name}</div>}
          </label>
        </div>

        <div className="modal-actions">
          <button
            className="upload-btn"
            onClick={handleUpload}
            disabled={!file || uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadInvoiceModal;
