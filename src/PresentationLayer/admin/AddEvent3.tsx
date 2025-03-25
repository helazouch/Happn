import React, { useState } from "react";
import Navbar from "./components/Navbar";
import "./AddEvent3.css";

const AddEvent3: React.FC = () => {
  const [place, setPlace] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [capacity, setCapacity] = useState<number>(250);
  const [price, setPrice] = useState<number>(250);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);

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
    console.log("Place:", place);
    console.log("Date:", date);
    console.log("Capacity:", capacity);
    console.log("Price:", price);
    console.log("Description:", description);
    console.log("Selected Categories:", selectedCategories);
    console.log("File:", file?.name);
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
    </div>
  );
};

export default AddEvent3;
