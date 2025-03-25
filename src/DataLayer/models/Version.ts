import { Timestamp } from 'firebase/firestore';

export interface Version {
  id_version?: string;
  nom_version: string;
  description_specifique: string;
  date: Date | Timestamp; // Accept both types
  place: string;
  price: number;
  planning: string;
  img: string;
  nbparticipants: number;
  capacity_max: number;
  plan_mediatique: string;
  eventId: string;
  participants?: string[];
}