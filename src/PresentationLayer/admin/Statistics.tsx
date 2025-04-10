import React, { useState } from 'react';
import './Statistics.css';
import Navbar from './components/Navbar';
import Notifications from './components/Notifications';
import AxesSelector from './components/AxesSelector';
import Chart from './components/Chart';

const App = () => {
    const [selectedAxis1, setSelectedAxis1] = useState("events");
    const [selectedAxis2, setSelectedAxis2] = useState("nbr participant");
  
    const handleAxesChange = (axis1: string, axis2: string) => {
      setSelectedAxis1(axis1);
      setSelectedAxis2(axis2);
    };
    console.log("Contenu de sessionStorage :");
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key) {
        console.log(`${key}: ${sessionStorage.getItem(key)}`);
      }
    }
    const isAuthenticated = sessionStorage.getItem("connexion");
    if (!isAuthenticated || isAuthenticated.trim() === "") {
      return (
        <div style={{ textAlign: "center", marginTop: "100px", fontSize: "24px", color: "red" }}>
          Accès non autorisé
        </div>
      );
    }
  
  
    return (
      <React.StrictMode>
        <Navbar />
        <div style={{ display: "flex", height: "70vh" , backgroundColor: "#ffffff"}}>
          <Notifications />
          <div style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <div className='axesselectorcontainer'>
              <AxesSelector onAxesChange={handleAxesChange} />
            </div>
            <div className='chartcontainer' >
              <Chart axis1={selectedAxis1} axis2={selectedAxis2} />
            </div>
          </div>
        </div>
      </React.StrictMode>
    );
  };

export default App;
