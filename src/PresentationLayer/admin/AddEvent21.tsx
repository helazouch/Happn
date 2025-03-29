import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { useNavigationServiceEvent } from "../../RoutingLayer/navigation/NavigationServiceEvent";
import "./AddEvent21.css";

const AddEvent21: React.FC = () => {
  const navigation = useNavigationServiceEvent();
  const eventName = sessionStorage.getItem("newEventName");
  const [organizer, setOrganizer] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleNext = () => {
    navigation.saveDetailsAndGoToAddEvent3(organizer, description);
  };

  return (
    <div className="main-content">
      <Navbar />
      <div className="main-content21">
        <h2 id="titre">{eventName}</h2>

        <h2 className="main-content21-h2">ORGANIZER:</h2>
        <input
          type="text"
          placeholder="Enter organizer name"
          value={organizer}
          onChange={(e) => setOrganizer(e.target.value)}
          className="organizer-input21"
          required
        />

        <h2 className="main-content21-h2">DESCRIPTION:</h2>
        <textarea
          placeholder="Enter event description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
