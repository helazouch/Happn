import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ConfirmationModal from "./ConfirmationModal";
import { EventService } from "../../ServiceLayer/eventManagement/EventService";
import { FirebaseService } from "../../ServiceLayer/firebase/FirebaseService";
import { useNavigationServiceAdminNavBar } from "../../RoutingLayer/navigation/NavigationServiceAdminNavBar";

import "./AddEvent3.css";
import "./ConfirmationModal.css";

const AddEvent3: React.FC = () => {

  // Form state
  const navigation = useNavigationServiceAdminNavBar();

  const [place, setPlace] = useState<string>("");
  const [specificDescription, setSpecificDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [capacity, setCapacity] = useState<number>(250);
  const [price, setPrice] = useState<number>(250);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [planningFile, setPlanningFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Load data from previous steps
  // useEffect(() => {
  //   const eventName = sessionStorage.getItem("newEventName");
  //   const organizer = sessionStorage.getItem("newEventOrganizer");
  //   const description = sessionStorage.getItem("newEventDescription");

  //   if (!eventName || !organizer || !description) {
  //     navigate("/events/new"); // Redirect if missing required data
  //   }
  // }, [navigate]);

  // Form handlers
  const handlePlaceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSpecificDescription(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCapacity(Number(event.target.value));
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setImageFile(event.target.files[0]);
    }
  };

  const handlePlanningChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setPlanningFile(event.target.files[0]);
    }
  };

  const handleModalSubmit = () => {
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      const eventData = {
        name: sessionStorage.getItem("newEventName") || "",
        organizer: sessionStorage.getItem("newEventOrganizer") || "",
        description: sessionStorage.getItem("newEventDescription") || "",
        // ↓ On ne met PAS les URLs ici ↓
      };
      
      const versionData = {  // <-- Créez un objet séparé pour les données de version
        place,
        date: new Date(date),
        capacity,
        price,
        specificDescription,
        categories: selectedCategories,
        img: imageFile ? await FirebaseService.uploadFile(imageFile, "images") : "",
        planning: planningFile ? await FirebaseService.uploadFile(planningFile, "plannings") : ""
      };
      
      // Appel au service
      const { eventId, versionId } = await EventService.createEventWithVersion(eventData, versionData);

    console.log("Événement créé avec succès, ID : ", eventId, " Version ID : ", versionId);

      navigation.goToEvents();
    } catch (err) {
      console.error("Event creation failed:", err);
      setError("Failed to create event. Please try again.");
    } finally {
      setIsSubmitting(false);
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const categories = [
    "Educational & Training Events",
    "Conferences & Seminars",
    "Cultural & Entertainment Events",
    "Sports & Wellness Events",
  ];

  return (
    <div className="page-container">
      <Navbar />
      <div className="main-content3">
        {error && <div className="error-message">{error}</div>}

        {/* First Column */}
        <div className="column">
          <div className="form-section">
            <h2 className="form-section-h2">PLACE:</h2>
            <input
              type="text"
              placeholder="Enter place"
              value={place}
              onChange={handlePlaceChange}
              required
            />
          </div>

          <div className="form-section">
            <h2 className="form-section-h2">DATE:</h2>
            <input
              type="date"
              value={date}
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
                value={capacity}
                onChange={handleCapacityChange}
                className="range-input"
                style={
                  {
                    "--fill-percent": `${(capacity / 500) * 100}%`,
                  } as React.CSSProperties
                }
              />
              <span className="range-value">{capacity}</span>
            </div>
          </div>

          <div className="form-section">
            <h2 className="form-section-h2">PRICE:</h2>
            <div className="range-container">
              <input
                type="range"
                min="1"
                max="500"
                value={price}
                onChange={handlePriceChange}
                className="range-input"
                style={
                  {
                    "--fill-percent": `${(price / 500) * 100}%`,
                  } as React.CSSProperties
                }
              />
              <span className="range-value">{price}</span>
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
          </div>

          <div className="form-section">
            <h2 className="form-section-h2">PICTURE:</h2>
            <input
              type="file"
              onChange={handleImageChange}
              className="file-input"
              accept="image/*"
            />
          </div>

          <div className="form-section">
            <h2 className="form-section-h2">SPECIFIED DESCRIPTION:</h2>
            <textarea
              placeholder="Enter detailed description"
              value={specificDescription}
              onChange={handleDescriptionChange}
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
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleModalSubmit}
            disabled={isSubmitting || !date || !place}
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

      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showModal}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        formData={{
          place,
          date,
          capacity,
          price,
          selectedCategories
        }}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default AddEvent3;