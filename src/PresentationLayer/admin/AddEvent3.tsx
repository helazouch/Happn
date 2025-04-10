import React, { useState } from "react";
//import Navbar from "./components/Navbar";
import ConfirmationModal from "./ConfirmationModal";
import { Timestamp } from "firebase/firestore";
import { Version } from "../../DataLayer/models/Version";
import "./AddEvent3.css";
import "./ConfirmationModal.css";
import { ServiceConnector } from "../../RoutingLayer/apiRoutes/eventRoute";
import { CloudinaryService } from "../../ServiceLayer/cloudinary/Upload";
import { useNavigationServiceEvent } from "../../RoutingLayer/navigation/NavigationServiceEvent";

interface ConfirmationData {
  place: string;
  date: string;
  capacity: number;
  price: number;
  selectedCategories: string[];
}

const AddEvent3: React.FC = () => {
  const navigation = useNavigationServiceEvent();
  const eventId = sessionStorage.getItem("currentEventId") || "";
  const eventName = sessionStorage.getItem("newEventName") || "";

  // Form state - always store dates as Date objects in component state
  const [versionData, setVersionData] = useState<Omit<Version, "id_version">>({
    versionName: `${eventName} - ${new Date().toLocaleDateString()}`,
    specificDescription: "",
    date: new Date(), // Always stored as Date in state
    place: "",
    price: 250,
    planning: "",
    img: "",
    nbparticipants: 0,
    capacity: 250,
    plan_mediatique: "",
    eventId,
    categories: [],
  });

  const [imageUrl, setImageUrl] = useState<string>("");
  const [planningUrl, setPlanningUrl] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Convert to Date object if it's a Timestamp
  const getDateObject = (date: Date | Timestamp): Date => {
    return date instanceof Date ? date : date.toDate();
  };

  // Handlers
  const handleInputChange =
    (field: keyof Omit<Version, "id_version">) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setVersionData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVersionData((prev) => ({
      ...prev,
      date: new Date(e.target.value), // Always store as Date
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

  const handleImageUpload = async (
    file: File,
    setUrl: (url: string) => void
  ) => {
    try {
      const url = await CloudinaryService.uploadImage(file);
      setUrl(url);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("IMAGE upload failed");
    }
  };

  const handleFileUpload = async (
    file: File,
    setUrl: (url: string) => void
  ) => {
    try {
      const url = await CloudinaryService.uploadFile(file);
      setUrl(url);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("File upload failed");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleImageUpload(e.target.files[0], setImageUrl);
    }
  };

  const handlePlanningChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFileUpload(e.target.files[0], setPlanningUrl);
    }
  };

  const handleSubmit = async () => {
    if (!eventId) {
      setError("No parent event found. Please start over.");
      return;
    }

    if (!versionData.place || !versionData.date) {
      setError("Place and date are required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // 1. Upload files first
      alert(imageUrl);
      alert(planningUrl);

      // 2. Prepare version data for Firestore
      const versionToCreate = {
        ...versionData,
        date: Timestamp.fromDate(getDateObject(versionData.date)), // Convert to Timestamp
        img: imageUrl,
        planning: planningUrl,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      // 3. Create version in Firestore
      const versionId = await ServiceConnector.createAndAttachVersion(
        eventId,
        versionToCreate
      );
      alert(` Version created successfully!\nVersion ID: ${versionId}`);
      navigation.goToMediaPlan(versionId);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create version";
      setError(errorMessage);
      console.error("Version creation error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    "Educational & Training Events",
    "Conferences & Seminars",
    "Cultural & Entertainment Events",
    "Sports & Wellness Events",
    "Charity Galas",
    "Community Festivals",
  ];

  // Get current date as Date object for display
  const currentDate = getDateObject(versionData.date);

  // Prepare confirmation data
  const confirmationData: ConfirmationData = {
    place: versionData.place,
    date: currentDate.toISOString().split("T")[0],
    capacity: versionData.capacity,
    price: versionData.price,
    selectedCategories: versionData.categories || [],
  };

  return (
    <div className="page-container">
      {error && <div className="error-message">{error}</div>}
      {/* Add this header section */}
      <div className="event-header">
        <h1>Creating Version for: {eventName}</h1>
      </div>
      <div className="main-content3">
        {/* First Column */}
        <div className="column">
          <div className="form-section">
            <h2 className="form-section-h2">VERSION NAME:</h2>
            <input
              type="text"
              placeholder="Enter version name"
              value={versionData.versionName}
              onChange={handleInputChange("versionName")}
              required
            />
          </div>
          <div className="form-section">
            <h2 className="form-section-h2">PLACE:</h2>
            <input
              type="text"
              placeholder="Enter place"
              value={versionData.place}
              onChange={handleInputChange("place")}
              required
            />
          </div>

          <div className="form-section">
            <h2 className="form-section-h2">DATE:</h2>
            <input
              type="date"
              value={currentDate.toISOString().split("T")[0]}
              onChange={handleDateChange}
              required
              min={new Date().toISOString().split("T")[0]}
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
                style={
                  {
                    "--fill-percent": `${(versionData.capacity / 500) * 100}%`,
                  } as React.CSSProperties
                }
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
                style={
                  {
                    "--fill-percent": `${(versionData.price / 500) * 100}%`,
                  } as React.CSSProperties
                }
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
              alt="ici"
              onChange={handlePlanningChange}
              //className="file-input"
              accept=".pdf"
            />
          </div>

          <div className="form-section">
            <h2 className="form-section-h2">PICTURE:</h2>
            <input
              type="file"
              onChange={handleImageChange}
              //className="file-input"
              accept="image/*"
            />
          </div>

          <div className="form-section">
            <h2 className="form-section-h2">SPECIFIED DESCRIPTION:</h2>
            <textarea
              placeholder="Enter detailed description"
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
          <button
            onClick={() => setShowModal(true)}
            disabled={isSubmitting || !versionData.place || !versionData.date}
            className="finish-button3"
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Creating...
              </>
            ) : (
              "Finish"
            )}
          </button>
        </div>
      </div>

      <ConfirmationModal
        show={showModal}
        onConfirm={handleSubmit}
        onCancel={() => setShowModal(false)}
        formData={confirmationData}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default AddEvent3;
