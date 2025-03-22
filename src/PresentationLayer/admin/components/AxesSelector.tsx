import { useState } from "react";
import"./AxesSelector.css";

interface AxesSelectorProps {
  onAxesChange: (axis1: string, axis2: string) => void;
}

const AxesSelector: React.FC<AxesSelectorProps> = ({ onAxesChange }) => {
  const [axis1, setAxis1] = useState("Axe 1");
  const [axis2, setAxis2] = useState("Axe 2");

  const handleSubmit = () => {
    onAxesChange(axis1, axis2);
  };

  return (
    <div className="container">
      <select className="select" value={axis1} onChange={(e) => setAxis1(e.target.value)}>
        <option value="Axe 1">Axe 1</option>
        <option value="Axe 2">Axe 2</option>
        <option value="Axe 3">Axe 3</option>
      </select>

      <select className="select" value={axis2} onChange={(e) => setAxis2(e.target.value)}>
        <option value="Axe 1">Axe 1</option>
        <option value="Axe 2">Axe 2</option>
        <option value="Axe 3">Axe 3</option>
      </select>

      <button className="button" onClick={handleSubmit}>
        ➝
      </button>
    </div>
  );
};

export default AxesSelector;
