import React, { useState } from "react";
import DuplicateEventModal from "./DuplicateEventModal";

const DuplicateEventModalTest: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [eventExists] = useState(true); // Variable booléenne pour la condition

  const handleYes = async () => {
    setIsLoading(true);
    console.log("Creating new version of event...");
    // Simulation de traitement
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("New version created!");
    setIsLoading(false);
    setShowModal(false);
  };

  const handleNo = () => {
    console.log("Operation canceled");
    setShowModal(false);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Test de la Modal de Duplication</h1>
      <button 
        onClick={() => setShowModal(true)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        Tester la Modal
      </button>

      {/* La modal s'affiche si showModal ET eventExists sont true */}
      <DuplicateEventModal
        show={showModal && eventExists}
        onYes={handleYes}
        onNo={handleNo}
        isLoading={isLoading}
      />

      <div style={{ marginTop: '20px' }}>
        <p>Variable booléenne eventExists: {eventExists.toString()}</p>
        <p>La modal apparaîtra seulement si eventExists est true</p>
      </div>
    </div>
  );
};

export default DuplicateEventModalTest;