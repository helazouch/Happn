import React, { useState } from "react";
import Navbar from "./components/Navbar";
import EventNameInput from "./components/EventNameInput";
import { ServiceConnector } from "../../RoutingLayer/apiRoutes/eventRoute";
import DuplicateEventModal from "./DuplicateEventModal";
import { useNavigationServiceEvent } from "../../RoutingLayer/navigation/NavigationServiceEvent";
import "./AddEvent1.css";

const AddEvent1: React.FC = () => {
  const navigation = useNavigationServiceEvent();
  const [eventName, setEventName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [duplicateModalState, setDuplicateModalState] = useState({
    show: false,
    eventName: "",
  });
  const handleNameSubmit = async (eventName: string): Promise<boolean> => {
    if (!eventName.trim()) {
      setError("Event name is required");
      return false;
    }

    setIsLoading(true);
    setError("");

    try {
      const exists = await ServiceConnector.doesEventExist(eventName);
      if (exists) {
        setDuplicateModalState({
          show: true,
          eventName: eventName,
        });
        return false;
      }
      navigation.goToAddEventDetails(eventName);
      return true;
    } catch (err) {
      setError("Error checking event name");
      console.error("Error in handleNameSubmit:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNewVersion = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching ID for event:", duplicateModalState.eventName);
      const eventId = await ServiceConnector.getEventId(
        duplicateModalState.eventName
      );
      console.log("Received event ID:", eventId);

      if (!eventId) {
        throw new Error("Received empty event ID");
      }

      console.log("Navigating to AddEvent3 with:", {
        eventName: duplicateModalState.eventName,
        eventId,
      });
      navigation.confirmDuplicateAndGoToAddEvent3(
        duplicateModalState.eventName,
        eventId
      );
    } catch (error) {
      console.error("Full error details:", error);
      setError(`Failed to create new version: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
      setDuplicateModalState({
        show: false,
        eventName: "",
      });
    }
  };

  const handleCancelNewVersion = () => {
    navigation.cancelDuplicateAndReturnToAddEvent1(
      duplicateModalState.eventName
    );
    setDuplicateModalState({
      show: false,
      eventName: "",
    });
  };
  const isAuthenticated = sessionStorage.getItem("connexion");
    if (!isAuthenticated || isAuthenticated.trim() === "") {
      return (
        <div style={{ textAlign: "center", marginTop: "100px", fontSize: "24px", color: "red" }}>
          Accès non autorisé
        </div>
      );
    }

  return (
    <div className="main-content">
      <Navbar />
      <div className="main-content11">
        <p id="textAddEvent1">New event, new stories to tell..</p>
        <EventNameInput
          eventName={eventName} // <-- Passe eventName en prop
          setEventName={setEventName} // <-- Passe setEventName en prop
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
