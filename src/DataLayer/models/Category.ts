export interface Category {
    id_category?: string;
    nom_category: string;
    related_events?: string[]; // Array of event IDs (many-to-many)
  }