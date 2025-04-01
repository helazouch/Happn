import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { useNavigationServiceEvent } from "../../RoutingLayer/navigation/NavigationServiceEvent";
import { ServiceConnector } from "../../RoutingLayer/apiRoutes/eventRoute";
import "./AddEvent21.css";

const AddEvent21: React.FC = () => {
  const navigation = useNavigationServiceEvent();
  const eventName = sessionStorage.getItem("newEventName") || "";
  const [organizer, setOrganizer] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!organizer.trim() || !description.trim()) {
      setError("Organizer and description are required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Show confirmation dialog
      const isConfirmed = window.confirm(
        `Create new event?\n\nEvent: ${eventName}\nOrganizer: ${organizer}`
      );
      if (!isConfirmed) return;

      // Create the event in database
      const eventId = await ServiceConnector.createEvent({
        name: eventName,
        organizer,
        description,
        categories: [],
        versions: [],
      });
      
      navigation.saveDetailsAndGoToAddEvent3(eventId,organizer, description);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Event creation failed";
      setError(errorMessage);
      console.error("Event creation error:", err);
    } finally {
      setIsLoading(false);
    }
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

        {error && <div className="error-message">{error}</div>}

        <button
          onClick={handleSubmit}
          className="next-button21"
          disabled={!organizer.trim() || !description.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Creating...
            </>
          ) : (
            "Next"
          )}
        </button>
      </div>
    </div>
  );
};

export default AddEvent21;
