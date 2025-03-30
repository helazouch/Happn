import { Timestamp } from 'firebase/firestore';

export interface Version {
  id_version?: string;
  versionName: string;
  specificDescription: string;
  date: Date | Timestamp;
  place: string;
  price: number;
  planning: string;
  img: string; 
  nbparticipants: number;
  capacity: number;
  plan_mediatique: string;
  eventId: string;
  participants?: string[];
  categories?: string[];
}