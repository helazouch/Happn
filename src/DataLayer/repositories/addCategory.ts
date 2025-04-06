// src/utilities/initFirebaseCategories.ts
import { CategoryRepository } from './CategoryRepository';

export const initializeDefaultCategories = async () => {
  try {
    const defaultCategories = [
      { nom_category: "Educational & Training Events" },
      { nom_category: "Conferences & Seminars" },
      { nom_category: "Cultural & Entertainment Events" },
      { nom_category: "Sports & Wellness Events" }
    ];

    for (const category of defaultCategories) {
      await CategoryRepository.create(category);
    }
    
    console.log(" Categories initialized successfully");
  } catch (error) {
    console.error(" Failed to initialize categories:", error);
  }
};

// Exécuter manuellement quand nécessaire
initializeDefaultCategories();