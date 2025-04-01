import React, { useState } from "react";
import "./EventNameInput.css";

interface EventNameInputProps {
  eventName: string;               // <-- Nouvelle prop
  setEventName: (name: string) => void; // <-- Nouvelle prop
  onSubmit: (name: string) => Promise<boolean>;
  error?: string;
  onError?: (message: string) => void;
  isLoading?: boolean;
}

const EventNameInput: React.FC<EventNameInputProps> = ({
  eventName,
  setEventName,
  onSubmit,
  error,
  onError,
  isLoading = false,
}) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(e.target.value);
    if (error && onError) onError("");
  };

  const handleNext = async () => {
    await onSubmit(eventName);
  };

  return (
    <div className="event-name-container">
      <input
        type="text"
        placeholder="Enter event name"
        value={eventName}
        onChange={handleInputChange}
        id='aa'
        disabled={isLoading}
      />
      <button
        onClick={handleNext}
        className="next-button11"
        disabled={!eventName.trim() || isLoading}
      >
        {isLoading ? "Checking..." : "Next"}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default EventNameInput;
