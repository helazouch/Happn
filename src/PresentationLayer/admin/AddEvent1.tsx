import React, { useState } from "react";
import Navbar from "./components/Navbar";
import EventNameInput from "./components/EventNameInput";
import { useNavigate } from "react-router-dom";
import { EventRepository } from "../../DataLayer/repositories/EventRepository";
import "./AddEvent1.css";
import DuplicateEventModal from "./DuplicateEventModal";

const AddEvent1: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [duplicateModalState, setDuplicateModalState] = useState({
    show: false,
    eventName: ""
  });  
  const [existingEventName, setExistingEventName] = useState("");

  const handleNameSubmit = async (name: string): Promise<boolean> => {
    if (!name.trim()) {
      setError("Event name is required");
      return false;
    }

    setIsLoading(true);
    setError("");

    try {
      const exists = await EventRepository.nameExists(name);
      if (exists) {
        setExistingEventName(name);
        setDuplicateModalState({
          show: true,
          eventName: name
        });
        return false;
      }
      sessionStorage.setItem("newEventName", name);
      navigate("/events/new/details");
      return true;
    } catch (err) {
      setError("Error checking event name");
      console.error("Error in handleNameSubmit:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNewVersion = () => {
    sessionStorage.setItem("newEventName", existingEventName);
    setDuplicateModalState({
      show: false,
      eventName: ""
    });
    navigate("/events/new/details");
  };

  const handleCancelNewVersion = () => {
    setDuplicateModalState({
      show: false,
      eventName: ""
    });
    setExistingEventName("");
  };

  return (
    <div className="main-content">
      <Navbar />
      <div className="main-content11">
        <p id="textAddEvent1">New event, new stories to tell..</p>
        <EventNameInput
          onSubmit={handleNameSubmit}
          error={error}
          onError={setError}
          isLoading={isLoading}
        />
      </div>

      {/* Ajout de la modale de duplication */}
      <DuplicateEventModal
        show={duplicateModalState.show}
        onYes={handleCreateNewVersion}
        onNo={handleCancelNewVersion}
        isLoading={isLoading}
        eventName={existingEventName} // Passez le nom de l'événement ici
      />
    </div>
  );
};

export default AddEvent1;