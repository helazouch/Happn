import React, { useState } from 'react';
import Navbar from './components/Navbar';
import './AddEvent3.css';

const AddEvent3: React.FC = () => {
    const [place, setPlace] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [capacity, setCapacity] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null); // État pour le fichier

    const handlePlaceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlace(event.target.value);
    };
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };
    

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const handleCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCapacity(event.target.value);
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value);
    };
    

    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]); // Stocke le fichier sélectionné
        }
    };

    const handleSubmit = () => {
        console.log('Place:', place);
        console.log('Date:', date);
        console.log('Capacity:', capacity);
        console.log('Price:', price);
        console.log('Selected Categories:', selectedCategories);
    };

    return (
        <div>
            <Navbar />
            <div className="main-content3">
                <div className='main-content13'>
                    <div className="form-section">
                        <h2 className="form-section-h2">PLACE:</h2>
                        <input
                            type="text"
                            placeholder="Enter place"
                            value={place}
                            onChange={handlePlaceChange}
                        />
                    </div>
                    <div className="form-section">
                        <h2 className="form-section-h2">DATE:</h2>
                        <input
                            type="date"
                            value={date}
                            onChange={handleDateChange}
                        />
                    </div>
                    <div className="form-section">
                        <h2 className="form-section-h2">CAPACITY:</h2>
                        <input
                            type="text"
                            placeholder="Enter capacity"
                            value={capacity}
                            onChange={handleCapacityChange}
                        />
                    </div>
                    <div className="form-section">
                        <h2 className="form-section-h2">PRICE:</h2>
                        <input
                            type="text"
                            placeholder="Enter price"
                            value={price}
                            onChange={handlePriceChange}
                        />
                    </div>
                </div>


                <div className='main-content13'>
                    <div className="form-section">
                        <h2 className="form-section-h2">PLANNING:</h2>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="file-input"
                        />
                    </div>
                    <div className="form-section">
                        <h2 className="form-section-h2">PICTURE:</h2>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="file-input"
                        />
                    </div>
                    <div className="form-section">
                        <h2 className="form-section-h2">SPECIFIED DESCRIPTION:</h2>
                        <textarea 
                            placeholder="Enter event description"
                            value={description}
                            // onChange={handleDescriptionChange}
                            className="description-textarea3"
                        />
                    </div>
                </div>


                <div className='main-content33'>
                    <div className="form-section">
                        <h2 className="form-section-h2" >CATEGORIES:</h2>
                        {[
                            'Educational & Training Events',
                            'Conferences & Seminars',
                            'Cultural & Entertainment Events',
                            'Sports & Wellness Events',
                        ].map((category) => (
                            <label key={category}>
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => handleCategoryChange(category)}
                                />
                                {category}
                            </label>
                        ))}
                    </div>
                    <button className="submit-button" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEvent3;
