export interface Participant {
    id_participant: string; // Will match Firebase Auth UID
    name: string;
    gender: string;
    birth_date: Date;
    country: string;
    phone: string;
    status: string;
    // Removed password field - handled by Firebase Auth
    email: string; // Renamed from 'mail' to match Firebase Auth
    registered_versions?: string[];
    createdAt: Date;
  }