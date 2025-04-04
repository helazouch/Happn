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

    const fileRef = ref(storage, `invoices/${participation.id}/${file.name}`);
    const task = uploadBytesResumable(fileRef, file);
    setUploadTask(task); // Store the upload task to cancel later

    task.on(
      "state_changed",
      (snapshot) => {
        // Progress handling (optional)
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload failed:", error);
        setUploading(false);
      },
      async () => {
        // Upload completed
        const downloadURL = await getDownloadURL(fileRef);

        await updateDoc(doc(db, "participations", participation.id), {
          paymentSubmitted: true,
          status: "pending_payment",
          paymentProofUrl: downloadURL,
        });

        console.log(`File uploaded: ${file.name}`);
        setUploading(false);
        onClose(); // Close modal after upload
      }
    );
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
