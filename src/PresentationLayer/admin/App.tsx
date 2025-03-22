import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Notifications from './components/Notifications';
import AxesSelector from './components/AxesSelector';
import Chart from './components/Chart';

const App = () => {
    const [selectedAxis1, setSelectedAxis1] = useState("Axe 1");
    const [selectedAxis2, setSelectedAxis2] = useState("Axe 2");
  
    const handleAxesChange = (axis1: string, axis2: string) => {
      setSelectedAxis1(axis1);
      setSelectedAxis2(axis2);
    };
  
    return (
      <React.StrictMode>
        <Navbar />
        <div style={{ display: "flex", height: "100vh" }}>
          <Notifications />
          <div style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <div className='axesselectorcontainer'>
              <AxesSelector onAxesChange={handleAxesChange} />
            </div>
            <div className='chartcontainer'>
              <Chart axis1={selectedAxis1} axis2={selectedAxis2} />
            </div>
          </div>
        </div>
      </React.StrictMode>
    );
  };

export default App;
