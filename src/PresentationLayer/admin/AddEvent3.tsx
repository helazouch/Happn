import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ConfirmationModal from "./ConfirmationModal";
import "./AddEvent3.css";
import "./ConfirmationModal.css";

const AddEvent3: React.FC = () => {
  const [place, setPlace] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [capacity, setCapacity] = useState<number>(250);
  const [price, setPrice] = useState<number>(250);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      // Ici vous mettrez votre vrai logique de soumission
      console.log("Données soumises:", {
        place,
        date,
        capacity,
        price,
        description,
        selectedCategories,
        file
      });
      
      // Simulation d'une requête API (2 secondes)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Événement créé avec succès!");
      setShowModal(false);
      
      // Réinitialiser le formulaire si besoin
      // setPlace("");
      // setDescription("");
      // etc...
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="main-content3">
        {/* First Column */}
        <div className="column">
          <div className="form-section">
            <h2 className="form-section-h2">PLACE:</h2>
            <input
              type="text"
              placeholder="Enter place"
              value={place}
              onChange={handlePlaceChange}
            />
          </div>
          <div className="form-section">
            <h2 className="form-section-h2">DATE:</h2>
            <input type="date" value={date} onChange={handleDateChange} />
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
              onChange={handleFileChange}
              className="file-input"
            />
          </div>
          <div className="form-section">
            <h2 className="form-section-h2">PICTURE:</h2>
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input"
            />
          </div>
          <div className="form-section">
            <h2 className="form-section-h2">SPECIFIED DESCRIPTION:</h2>
            <textarea
              placeholder="Enter event description"
              value={description}
              onChange={handleDescriptionChange}
              className="description-textarea"
            />
          </div>
        </div>

        {/* Third Column */}
        <div className="column">
          <div className="form-section">
            <h2 className="form-section-h2">CATEGORIES:</h2>
            <div className="categories-list">
              {[
                "Educational & Training Events",
                "Conferences & Seminars",
                "Cultural & Entertainment Events",
                "Sports & Wellness Events",
              ].map((category) => (
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
          <div className="finish-text" onClick={handleSubmit}>
            Finish
          </div>
        </div>
      </div>

      {/* Modal de confirmation */}
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