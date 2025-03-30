// src/dataLayer/models/Event.ts
export interface Event {
  id_event?: string;
  name: string;
  organizer: string;
  description: string;
  categories?: string[];
  versions?: string[];
  createdAt?: string;
  updatedAt?: string;
}