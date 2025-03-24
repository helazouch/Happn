import React, { useState } from 'react';
import Navbar from './components/Navbar';

import './AddEvent21.css';

const AddEvent21: React.FC = () => {
    const [organizer, setOrganizer] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const handleOrganizerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrganizer(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleNext = () => {
        // Logique pour le bouton Next
        console.log('Organizer:', organizer);
        console.log('Description:', description);
    };

    return (
        <div>
            <Navbar />
            <div className="main-content21">
                <h2>ORGANIZER:</h2>
                <input
                    type="text"
                    placeholder="Enter organizer name"
                    value={organizer}
                    onChange={handleOrganizerChange}
                    className="organizer-input"
                />
                <h2>DESCRIPTION:</h2>
                <textarea
                    placeholder="Enter event description"
                    value={description}
                    onChange={handleDescriptionChange}
                    className="description-textarea"
                />
                <button onClick={handleNext} className="next-button">
                    Next
                </button>
            </div>
        </div>
    );
};

export default AddEvent21;