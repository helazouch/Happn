import React, { useState } from "react";
import Navbar from "./components/Navbar";
import EventNameInput from "./components/EventNameInput";
import { useNavigate } from "react-router-dom";
import { EventRepository } from "../../DataLayer/repositories/EventRepository";
import "./AddEvent1.css";

const AddEvent1: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        setError("An event with this name already exists");
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

  return (
    <div>
      <Navbar />
      <div className="main-content1">
        <p id="textAddEvent1">New event, new stories to tell..</p>
        <EventNameInput
          onSubmit={handleNameSubmit}
          error={error}
          onError={setError}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default AddEvent1;
