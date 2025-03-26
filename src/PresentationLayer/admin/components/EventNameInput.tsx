import React, { useState } from "react";
import "./EventNameInput.css";

interface EventNameInputProps {
  onSubmit: (name: string) => Promise<boolean>;
  error?: string;
  onError?: (message: string) => void;
  isLoading?: boolean;
}

const EventNameInput: React.FC<EventNameInputProps> = ({
  onSubmit,
  error,
  onError,
  isLoading = false,
}) => {
  const [eventName, setEventName] = useState("");

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
        className={`event-name-input ${error ? "error" : ""}`}
        disabled={isLoading}
      />
      {error && <p className="error-message">{error}</p>}
      <button
        onClick={handleNext}
        className="next-button"
        disabled={!eventName.trim() || isLoading}
      >
        {isLoading ? "Checking..." : "Next"}
      </button>
    </div>
  );
};

export default EventNameInput;
