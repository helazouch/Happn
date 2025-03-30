// src/ServicesLayer/firebase/FirebaseService.ts
import { storage, db } from "./firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, arrayUnion, collection, doc, enableMultiTabIndexedDbPersistence, FirestoreError, Timestamp, updateDoc } from "firebase/firestore";
import { Event } from "../../DataLayer/models/Event";
import { Version } from "../../DataLayer/models/Version";

// Initialize persistence
enableMultiTabIndexedDbPersistence(db).catch((err: unknown) => {
  if (err instanceof FirestoreError) {
    console.warn(`Firestore persistence error (${err.code}): ${err.message}`);
  } else {
    console.warn("Unknown persistence error:", err);
  }
});

export class FirebaseService {
  static async createEvent(eventData: Omit<Event, "id_event">): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, "events"), {
        ...eventData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error: unknown) {
      if (error instanceof FirestoreError) {
        console.error("Firestore error:", {
          code: error.code,
          message: error.message,
          stack: error.stack
        });
        throw new Error(`Database error: ${error.message}`);
      }
      throw new Error("Unknown database error occurred");
    }
  }

  static async uploadFile(file: File, folder: string): Promise<string> {
    try {
      const fileRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
      await uploadBytesResumable(fileRef, file);
      return await getDownloadURL(fileRef);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`File upload failed: ${error.message}`);
      }
      throw new Error("Unknown file upload error occurred");
    }
  
  }
  static async createVersion(versionData: Omit<Version, 'id_version'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, "versions"), {
        ...versionData,
        date: versionData.date instanceof Date ? versionData.date.toISOString() : versionData.date,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error("Version creation error:", error);
      throw new Error("Failed to create version");
    }
  }
  

  static async addVersionToEvent(eventId: string, versionId: string): Promise<void> {
    try {
      const eventRef = doc(db, "events", eventId);
      await updateDoc(eventRef, {
        versions: arrayUnion(versionId),
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error("Error adding version to event:", error);
      throw new Error("Failed to update event with new version");
    }
  }
}