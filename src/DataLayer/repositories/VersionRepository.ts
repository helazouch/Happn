import { db } from "../firebase/config";
import { collection, doc, setDoc, updateDoc, increment, getDoc, arrayUnion } from "firebase/firestore";
import type { Version } from "../models/Version";

const versionsCol = collection(db, "versions");

export const VersionRepository = {
  // Create new version
  async create(version: Omit<Version, "id_version" | "participants">): Promise<string> {
    const docRef = doc(versionsCol);
    await setDoc(docRef, {
      ...version,
      id_version: docRef.id,
      participants: [],
      nbparticipants: 0
    });
    return docRef.id;
  },

  // Register participant
  async registerParticipant(versionId: string, participantId: string): Promise<void> {
    await updateDoc(doc(versionsCol, versionId), {
      participants: arrayUnion(participantId),
      nbparticipants: increment(1)
    });
  },

  // Check capacity
  async checkCapacity(versionId: string): Promise<{ current: number, max: number }> {
    const snap = await getDoc(doc(versionsCol, versionId));
    const version = snap.data() as Version;
    return {
      current: version.nbparticipants,
      max: version.capacity_max
    };
  }
};