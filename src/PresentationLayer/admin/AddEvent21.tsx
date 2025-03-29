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
    <div className="main-content">
      <Navbar />
      <div className="main-content21">
        <h2 id="titre"> {eventName}</h2>

        <h2 className="main-content21-h2">ORGANIZER:</h2>
        <input
          type="text"
          placeholder="Enter organizer name"
          value={organizer}
          onChange={handleOrganizerChange}
          className="organizer-input21"
          required
        />

        <h2 className="main-content21-h2">DESCRIPTION:</h2>
        <textarea
          placeholder="Enter event description"
          value={description}
          onChange={handleDescriptionChange}
          className="description-textarea21"
          required
        />

        <button
          onClick={handleNext}
          className="next-button21"
          disabled={!organizer.trim() || !description.trim()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AddEvent21;
