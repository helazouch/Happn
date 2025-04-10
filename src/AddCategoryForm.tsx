import React, { useState } from "react";
import { CategoryRepository } from "./DataLayer/repositories/CategoryRepository";

const AddCategoryForm: React.FC = () => {
  const [categoryName, setCategoryName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      if (!categoryName.trim()) {
        setErrorMessage("Le nom de la catégorie est requis.");
        return;
      }

      await CategoryRepository.create({ nom_category: categoryName });
      setSuccessMessage("Catégorie ajoutée avec succès !");
      setCategoryName("");
    } catch (error) {
      setErrorMessage("Erreur lors de l’ajout de la catégorie.");
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
      <h2>Ajouter une catégorie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Nom de la catégorie"
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />
        <button
          type="submit"
          style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
        >
          Ajouter
        </button>
      </form>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default AddCategoryForm;
