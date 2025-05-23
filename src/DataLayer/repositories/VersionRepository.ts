import { db } from "../../ServiceLayer/firebase/firebaseConfig";
import { collection, doc, setDoc, updateDoc, increment, getDoc, arrayUnion, Timestamp, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import type { Version } from "../models/Version";
import { Event } from "../models/Event";

const versionsCol = collection(db, "versions");

export const VersionRepository = {
  // Create new version
  async create(version: Omit<Version, "id_version" | "participants">): Promise<string> {
    const docRef = doc(versionsCol);
    await setDoc(docRef, {
      ...version,
      id_version: docRef.id,
      participants: [],
      nbparticipants: 0,
      canceled: false,
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
      max: version.capacity
    };
  },

  // Get last version by event ID
  async getLastVersionByEventId(eventId: string): Promise<Version | null> {
    try {
      // 1. Créer la requête
      const q = query(
        versionsCol,
        where("eventId", "==", eventId),
        orderBy("date", "desc"),
        limit(1)
      );

      // 2. Exécuter la requête
      const querySnapshot = await getDocs(q);

      // 3. Traiter les résultats
      if (querySnapshot.empty) {
        return null;
      }

      const doc = querySnapshot.docs[0];
      const data = doc.data();

      // 4. Convertir Timestamp en Date si nécessaire
      return {
        ...data,
        id_version: doc.id,
        date: data.date instanceof Timestamp ? data.date.toDate() : data.date
      } as Version;
      
    } catch (error) {
      console.error("Error getting last version:", error);
      throw new Error("Failed to fetch last version");
    }
    
  },


  async getById(id: string): Promise<Version | null> {
    const snap = await getDoc(doc(versionsCol, id));
    return snap.exists() ? snap.data() as Version : null;
  },


  async getVersionWithEventDetails(versionId: string): Promise<{ version: Version, event: Event } | null> {
    try {
      // Récupérer la version
      const versionRef = doc(db, "versions", versionId);
      const versionSnap = await getDoc(versionRef);
      
      if (!versionSnap.exists()) return null;
  
      const versionData = versionSnap.data() as Version;
      
      // Récupérer l'événement associé
      const eventRef = doc(db, "events", versionData.eventId);
      const eventSnap = await getDoc(eventRef);
      
      if (!eventSnap.exists()) return null;
  
      const eventData = eventSnap.data() as Event;
  
      return {
        version: versionData,
        event: eventData
      };
    } catch (error) {
      console.error("Error fetching version and event details:", error);
      return null;
    }
  },


  async getByEventId(eventId: string): Promise<Version[]> {
    const q = query(versionsCol, where("eventId", "==", eventId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id_version: doc.id,
      ...doc.data()
    } as Version));
  },

  // Get participant count for a specific version
  async getParticipantCount(versionId: string): Promise<number> {
    const versionDoc = await getDoc(doc(versionsCol, versionId));
    if (!versionDoc.exists()) return 0;
    return versionDoc.data().nbparticipants || 0;
  },
    // Update media plan of a version
    async updateMediaPlan(versionId: string, mediaPlanContent: string): Promise<void> {
      try {
        const versionRef = doc(versionsCol, versionId);
        await updateDoc(versionRef, {
          plan_mediatique: mediaPlanContent
        });
        console.log("Media plan updated successfully.");
      } catch (error) {
        console.error("Error updating media plan:", error);
        throw new Error("Failed to update media plan");
      }
    },
  

};







export async function getVersionWithEventDetails(versionId: string): Promise<{ version: Version, event: Event } | null> {
  try {
    // Récupérer la version
    const versionRef = doc(db, "versions", versionId);
    const versionSnap = await getDoc(versionRef);
    
    if (!versionSnap.exists()) return null;

    const versionData = versionSnap.data() as Version;
    
    // Récupérer l'événement associé
    const eventRef = doc(db, "events", versionData.eventId);
    const eventSnap = await getDoc(eventRef);
    
    if (!eventSnap.exists()) return null;

    const eventData = eventSnap.data() as Event;

    return {
      version: versionData,
      event: eventData
    };
  } catch (error) {
    console.error("Error fetching version and event details:", error);
    return null;
  }
}