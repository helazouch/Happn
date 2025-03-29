import React, { useState } from "react";
import Navbar from "./components/Navbar";
import EventNameInput from "./components/EventNameInput";
import { EventRepository } from "../../DataLayer/repositories/EventRepository";
import DuplicateEventModal from "./DuplicateEventModal";
import { useNavigationServiceEvent } from "../../RoutingLayer/navigation/NavigationServiceEvent";  
import "./AddEvent1.css";

const AddEvent1: React.FC = () => {
  const navigation = useNavigationServiceEvent();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [duplicateModalState, setDuplicateModalState] = useState({
    show: false,
    eventName: ""
  });

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
        setDuplicateModalState({
          show: true,
          eventName: name
        });
        return false;
      }
      navigation.goToAddEventDetails(name);
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
    navigation.confirmDuplicateAndGoToAddEvent3(duplicateModalState.eventName);
  };

  const handleCancelNewVersion = () => {
    navigation.cancelDuplicateAndReturnToAddEvent1(
      duplicateModalState.eventName
    );
    setDuplicateModalState({
      show: false,
      eventName: ""
    });
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

      <DuplicateEventModal
        show={duplicateModalState.show}
        onYes={handleCreateNewVersion}
        onNo={handleCancelNewVersion}
        isLoading={isLoading}
        eventName={duplicateModalState.eventName}
      />
    </div>
  );
};

export default AddEvent1;
