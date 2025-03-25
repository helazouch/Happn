import React from 'react';
import Navbar from './components/Navbar';
import EventNameInput from './components/EventNameInput';
import './AddEvent1.css';

const AddEvent1: React.FC = () => {
    return (
        <div >
            <Navbar />
            <div className="main-content1">
                <p id='textAddEvent1'>New event, new stories to tell..</p>
                <EventNameInput />
            </div>
        </div>
    );
};

export default AddEvent1;