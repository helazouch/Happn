import { db } from "../firebase/config";
import { collection, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import type { Participant } from "../models/participant";

const participantsCol = collection(db, "participants");

export const ParticipantRepository = {
  // Create new participant profile (linked to Firebase Auth UID)
  async create(participant: Participant): Promise<void> {
    await setDoc(doc(participantsCol, participant.id_participant), {
      ...participant,
      createdAt: new Date()
    });
  },

  // Get participant by ID (Auth UID)
  async getById(id: string): Promise<Participant | null> {
    const snap = await getDoc(doc(participantsCol, id));
    return snap.exists() ? snap.data() as Participant : null;
  },

  // Update participant profile
  async update(id: string, data: Partial<Participant>): Promise<void> {
    await updateDoc(doc(participantsCol, id), data);
  },

  // Register for an event version
  async registerForVersion(participantId: string, versionId: string): Promise<void> {
    await updateDoc(doc(participantsCol, participantId), {
      registered_versions: arrayUnion(versionId)
    });
  },

  // Cancel registration
  async cancelRegistration(participantId: string, versionId: string): Promise<void> {
    await updateDoc(doc(participantsCol, participantId), {
      registered_versions: arrayRemove(versionId)
    });
  }
};