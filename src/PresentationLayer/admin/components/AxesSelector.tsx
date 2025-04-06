import { useState } from "react";
import "./AxesSelector.css";

interface AxesSelectorProps {
  onAxesChange: (axis1: string, axis2: string) => void;
}

const AxesSelector: React.FC<AxesSelectorProps> = ({ onAxesChange }) => {
  const [axis1, setAxis1] = useState<string>("");
  const [axis2, setAxis2] = useState<string>("");

  // Options disponibles
  const axisOptions = {
    primary: ["category", "events"],
    secondary: {
      category: ["nbr participant", "nbr events"],
      events: ["nbr participant"],
    },
  };

  // Gestion du changement d'axe 1
  const handleAxis1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAxis1 = e.target.value;
    setAxis1(newAxis1);
    // Réinitialiser l'axe 2 si incompatible avec le nouvel axe 1
    if (axis2 && !axisOptions.secondary[newAxis1 as keyof typeof axisOptions.secondary].includes(axis2)) {
      setAxis2("");
    }
  };

  // Gestion du changement d'axe 2
  const handleAxis2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAxis2 = e.target.value;
    setAxis2(newAxis2);
    // Réinitialiser l'axe 1 si incompatible avec le nouvel axe 2
    if (axis1 && !Object.keys(axisOptions.secondary).some(
      ax => axisOptions.secondary[ax as keyof typeof axisOptions.secondary].includes(newAxis2)
    )) {
      setAxis1("");
    }
  };

  const handleSubmit = () => {
    if (axis1 && axis2) {
      onAxesChange(axis1, axis2);
    }
  };

  // Options disponibles pour l'axe 2 en fonction de l'axe 1 sélectionné
  const getSecondaryOptions = () => {
    if (!axis1) return [...axisOptions.secondary.category, ...axisOptions.secondary.events];
    return axisOptions.secondary[axis1 as keyof typeof axisOptions.secondary];
  };

  // Options disponibles pour l'axe 1 en fonction de l'axe 2 sélectionné
  const getPrimaryOptions = () => {
    if (!axis2) return axisOptions.primary;
    return axisOptions.primary.filter(ax => 
      axisOptions.secondary[ax as keyof typeof axisOptions.secondary].includes(axis2)
    );
  };

  return (
    <div className="container">
      <select 
        className="select" 
        value={axis1} 
        onChange={handleAxis1Change}
      >
        <option value="">Sélectionnez un axe 1</option>
        {getPrimaryOptions().map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select 
        className="select" 
        value={axis2} 
        onChange={handleAxis2Change}
      >
        <option value="">Sélectionnez un axe 2</option>
        {getSecondaryOptions().map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button 
        className="button" 
        onClick={handleSubmit}
        disabled={!axis1 || !axis2}
      >
        ➝
      </button>
    </div>
  );
};

export default AxesSelector;