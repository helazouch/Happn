export interface Event {
    id_event?: string;
    name: string;
    organizer: string;
    description: string;
    categories?: string[]; // Array of category IDs (many-to-many)
    versions?: string[]; // Array of version IDs (one-to-many)
  }