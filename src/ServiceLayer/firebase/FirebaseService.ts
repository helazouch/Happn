// src/ServicesLayer/firebase/FirebaseService.ts
import { storage, db, createUserWithEmailAndPassword, auth, googleProvider } from "./firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, arrayUnion, collection, doc, enableMultiTabIndexedDbPersistence, FirestoreError, Timestamp, updateDoc } from "firebase/firestore";
import { Event } from "../../DataLayer/models/Event";
import { Version } from "../../DataLayer/models/Version";
import { signInWithEmailAndPassword, signInWithPopup, User } from "firebase/auth";

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


  // static async uploadFile(file: File, folder: string): Promise<string> {
  //   try {
  //     const fileRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
  //     await uploadBytesResumable(fileRef, file);
  //     return await getDownloadURL(fileRef);
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       throw new Error(`File upload failed: ${error.message}`);
  //     }
  //     throw new Error("Unknown file upload error occurred");
  //   }
  
  // }

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

  static async updateVersion(
    versionId: string,
    versionData: Partial<Omit<Version, 'id_version'>>
  ): Promise<void> {
    try {
      const versionRef = doc(db, "versions", versionId);
      
      // Prepare the update data with proper typing
      const updateData: {
        [K in keyof Omit<Version, 'id_version'>]?: Version[K] extends Date 
          ? Timestamp | Date 
          : Version[K];
      } & { updatedAt: Timestamp } = {
        ...versionData,
        updatedAt: Timestamp.now()
      };
  
      // Convert Date fields to Timestamp
      if (updateData.date instanceof Date) {
        updateData.date = Timestamp.fromDate(updateData.date);
      }
  
      await updateDoc(versionRef, updateData);
    } catch (error) {
      console.error("Version update error:", error);
      throw new Error("Failed to update version");
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

  static async signUpWithEmail(email: string, password: string): Promise<{ user: User; isSpecialUser: boolean }> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const specialEmails = ["lindachrigui03@gmail.com", "zouchhend1@gmail.com"];
      const isSpecialUser = specialEmails.includes(user.email || "");
      return { user, isSpecialUser };
    } catch (error) {
      console.error("Error during sign-up:", error);
      throw error;
    }
  }

  static async signWithGoogle(): Promise<{ user: User; isSpecialUser: boolean }> {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      const specialEmails = ["lindachrigui03@gmail.com", "zouchhend1@gmail.com"];
      const isSpecialUser = specialEmails.includes(user.email || "");
      return { user, isSpecialUser };
    } catch (error) {
      console.error("Error during sign-in:", error);
      throw error;
    }
  }

  static async signInWithEmail(email: string, password: string): Promise<{ user: User; isSpecialUser: boolean }> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const specialEmails = ["lindachrigui03@gmail.com", "zouchhend1@gmail.com"];
      const isSpecialUser = specialEmails.includes(user.email || "");
      return { user, isSpecialUser };
    } catch (error) {
      console.error("Error during sign-up:", error);
      throw error;
    }
  }
}