import React, { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { Version } from "../../../DataLayer/models/Version";
import { ServiceConnector } from "../../../RoutingLayer/apiRoutes/eventRoute";
import "./ModifyEventModal.css";

interface ModifyEventModalProps {
  show: boolean;
  onClose: () => void;
  onSuccess: (updatedEvent: Version) => void;
  eventData: Version;
  
}

const ModifyEventModal: React.FC<ModifyEventModalProps> = ({
  show,
  onClose,
  onSuccess,
  eventData,
}) => {
  const [versionData, setVersionData] = useState<Version>(eventData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [planningFile, setPlanningFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "Educational & Training Events",
    "Conferences & Seminars",
    "Cultural & Entertainment Events",
    "Sports & Wellness Events",
  ];

  const handleInputChange =
    (field: keyof Version) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setVersionData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVersionData((prev) => ({
      ...prev,
      date: new Date(e.target.value),
    }));
  };

  const handleNumberChange =
    (field: "price" | "capacity") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVersionData((prev) => ({
        ...prev,
        [field]: Number(e.target.value),
      }));
    };

  const handleCategoryChange = (category: string) => {
    setVersionData((prev) => {
      const newCategories = prev.categories?.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...(prev.categories || []), category];
      return { ...prev, categories: newCategories };
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setImageFile(e.target.files[0]);
  };

  const handlePlanningChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setPlanningFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!versionData.id_version) {
      setError("Event ID is missing");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Upload files if they were changed
      const [imgUrl, planningUrl] = await Promise.all([
        imageFile
          ? ServiceConnector.uploadEventFile(imageFile)
          : versionData.img,
        planningFile
          ? ServiceConnector.uploadEventFile(planningFile)
          : versionData.planning,
      ]);

      // Prepare updated version data
      const versionToUpdate = {
        ...versionData,
        img: imgUrl,
        planning: planningUrl,
        date: Timestamp.fromDate(
          versionData.date instanceof Date
            ? versionData.date
            : versionData.date.toDate()
        ),
        updatedAt: Timestamp.now(),
      };

      await ServiceConnector.updateVersion(
        versionData.id_version,
        versionToUpdate
      );

      // Call onSuccess with the updated data
      onSuccess({
        ...versionToUpdate,
        date:
          versionToUpdate.date instanceof Timestamp
            ? versionToUpdate.date.toDate()
            : versionToUpdate.date,
      });

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update event");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Modify Event</h2>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="modal-body">
          {/* First Column */}
          <div className="column">
            <div className="form-section">
              <h2 className="form-section-h2">VERSION NAME:</h2>
              <input
                type="text"
                value={versionData.versionName}
                onChange={handleInputChange("versionName")}
                required
              />
            </div>

            <div className="form-section">
              <h2 className="form-section-h2">PLACE:</h2>
              <input
                type="text"
                value={versionData.place}
                onChange={handleInputChange("place")}
                required
              />
            </div>

            <div className="form-section">
              <h2 className="form-section-h2">DATE:</h2>
              <input
                type="date"
                value={
                  versionData.date instanceof Date
                    ? versionData.date.toISOString().split("T")[0]
                    : versionData.date.toDate().toISOString().split("T")[0]
                }
                onChange={handleDateChange}
                required
              />
            </div>

            <div className="form-section">
              <h2 className="form-section-h2">CAPACITY:</h2>
              <div className="range-container">
                <input
                  type="range"
                  min="1"
                  max="500"
                  value={versionData.capacity}
                  onChange={handleNumberChange("capacity")}
                  className="range-input"
                />
                <span className="range-value">{versionData.capacity}</span>
              </div>
            </div>

            <div className="form-section">
              <h2 className="form-section-h2">PRICE:</h2>
              <div className="range-container">
                <input
                  type="range"
                  min="1"
                  max="500"
                  value={versionData.price}
                  onChange={handleNumberChange("price")}
                  className="range-input"
                />
                <span className="range-value">{versionData.price}</span>
              </div>
            </div>
          </div>

          {/* Second Column */}
          <div className="column">
            <div className="form-section">
              <h2 className="form-section-h2">PLANNING:</h2>
              <input
                type="file"
                onChange={handlePlanningChange}
                className="file-input"
                accept=".pdf,.doc,.docx"
              />
              {versionData.planning && (
                <div className="current-file">
                  Current: {versionData.planning.split("/").pop()}
                </div>
              )}
            </div>

            <div className="form-section">
              <h2 className="form-section-h2">PICTURE:</h2>
              <input
                type="file"
                onChange={handleImageChange}
                className="file-input"
                accept="image/*"
              />
              {versionData.img && (
                <div className="current-file">
                  Current: {versionData.img.split("/").pop()}
                </div>
              )}
            </div>

            <div className="form-section">
              <h2 className="form-section-h2">DESCRIPTION:</h2>
              <textarea
                value={versionData.specificDescription}
                onChange={handleInputChange("specificDescription")}
                className="description-textarea"
                rows={5}
              />
            </div>
          </div>

          {/* Third Column */}
          <div className="column">
            <div className="form-section">
              <h2 className="form-section-h2">CATEGORIES:</h2>
              <div className="categories-list">
                {categories.map((category) => (
                  <label key={category} className="category-item">
                    <input
                      type="checkbox"
                      checked={
                        versionData.categories?.includes(category) || false
                      }
                      onChange={() => handleCategoryChange(category)}
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="save-button"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifyEventModal;
