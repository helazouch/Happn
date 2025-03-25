import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import "./AddEvent21.css";

const AddEvent21: React.FC = () => {
  const navigate = useNavigate();
  const eventName = sessionStorage.getItem("newEventName");
  const [organizer, setOrganizer] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleOrganizerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOrganizer(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleNext = () => {
    // Save data to session storage before navigating
    sessionStorage.setItem("newEventOrganizer", organizer);
    sessionStorage.setItem("newEventDescription", description);

    // Navigate to next step
    navigate("/events/new/finalize");
  };

  return (
    <div>
      <Navbar />
      <div className="main-content21">
        <h2>Creating: {eventName}</h2>

        <h3>ORGANIZER:</h3>
        <input
          type="text"
          placeholder="Enter organizer name"
          value={organizer}
          onChange={handleOrganizerChange}
          className="organizer-input"
          required
        />

        <h3>DESCRIPTION:</h3>
        <textarea
          placeholder="Enter event description"
          value={description}
          onChange={handleDescriptionChange}
          className="description-textarea"
          required
        />

        <button
          onClick={handleNext}
          className="next-button"
          disabled={!organizer.trim() || !description.trim()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AddEvent21;
