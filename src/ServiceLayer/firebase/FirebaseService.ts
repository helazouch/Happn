// src/ServicesLayer/firebase/FirebaseService.ts
import { db, createUserWithEmailAndPassword, auth, googleProvider } from "./firebaseConfig";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { 
  addDoc, 
  arrayUnion, 
  collection, 
  doc, 
  enableMultiTabIndexedDbPersistence, 
  FirestoreError, 
  getDocs, 
  query, 
  Timestamp, 
  updateDoc, 
  where,
  DocumentData 
} from "firebase/firestore";
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

type FirestoreVersionDocument = DocumentData & {
  versionName?: string;
  specificDescription?: string;
  date?: Timestamp | Date | string;
  place?: string;
  price?: number;
  planning?: string;
  img?: string;
  nbparticipants?: number;
  capacity?: number;
  plan_mediatique?: string;
  eventId?: string;
  participants?: string[];
  categories?: string[];
  canceled?: boolean;
  createdAt?: Timestamp | Date | string;
  updatedAt?: Timestamp | Date | string;
};

export class FirebaseService {
  static async createEvent(eventData: Omit<Event, "id_event">): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, "events"), {
        ...eventData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        
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

  static async createVersion(versionData: Omit<Version, 'id_version'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, "versions"), {
        ...versionData,
        date: versionData.date instanceof Date ? Timestamp.fromDate(versionData.date) : versionData.date,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        canceled:false
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
      
      const updateData: Partial<FirestoreVersionDocument> & { updatedAt: Timestamp } = {
        ...versionData,
        updatedAt: Timestamp.now()
      };

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
      console.error("Error during sign-in:", error);
      throw error;
    }
  }

  static async getAllVersions(): Promise<Version[]> {
    try {
      const versionsRef = collection(db, "versions");
      const snapshot = await getDocs(versionsRef);
      
      return snapshot.docs.map(doc => ({
        id_version: doc.id,
        ...this.parseVersionData(doc.data())
      }));
    } catch (error) {
      console.error("[EventService] Error fetching all versions:", error);
      throw new Error("Failed to fetch versions");
    }
  }
  
  static async getVersionsByStatus(canceled: boolean): Promise<Version[]> {
    try {
      const versionsRef = collection(db, "versions");
      const q = query(versionsRef, where("canceled", "==", canceled));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id_version: doc.id,
        ...this.parseVersionData(doc.data())
      }));
    } catch (error) {
      console.error("[EventService] Error fetching versions by status:", error);
      throw new Error(`Failed to fetch ${canceled ? 'canceled' : 'active'} versions`);
    }
  }

  private static parseVersionData(data: FirestoreVersionDocument): Omit<Version, 'id_version'> {
    const normalizeDate = (dateValue: Timestamp | Date | string | undefined): Date => {
      if (!dateValue) return new Date();
      if (dateValue instanceof Date) return dateValue;
      if (dateValue instanceof Timestamp) return dateValue.toDate();
      try {
        return new Date(dateValue);
      } catch {
        return new Date();
      }
    };

    return {
      versionName: data.versionName ?? "Unknown Version",
      specificDescription: data.specificDescription ?? "",
      date: normalizeDate(data.date),
      place: data.place ?? "",
      price: data.price ?? 0,
      planning: data.planning ?? "",
      img: data.img ?? "",
      nbparticipants: data.nbparticipants ?? 0,
      capacity: data.capacity ?? 0,
      plan_mediatique: data.plan_mediatique ?? "",
      eventId: data.eventId ?? "",
      participants: data.participants ?? [],
      categories: data.categories ?? [],
      canceled: data.canceled ?? false
    };
  }

  // Kept commented in case you want to use it later
  /*
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
  */
}