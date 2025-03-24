import React, { useState } from 'react';
import './EventNameInput.css'; // Nous allons créer ce fichier CSS ensuite

const EventNameInput: React.FC = () => {
    const [eventName, setEventName] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEventName(event.target.value);
    };

    const handleNext = () => {
        // Logique pour le bouton Next
        console.log('Event Name:', eventName);
    };

    return (
        <div className="event-name-container">
            <input
                type="text"
                placeholder="Enter event name"
                value={eventName}
                onChange={handleInputChange}
                className="event-name-input"
            />
            <button onClick={handleNext} className="next-button">
                Next
            </button>
        </div>
    );
};

export default EventNameInput;