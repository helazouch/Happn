import { db } from "../../ServiceLayer/firebase/firebaseConfig";
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  arrayUnion,
  query,
  where,
  getDocs 
} from "firebase/firestore";
import type { Event } from "../models/Event";

const eventsCol = collection(db, "events");

export const EventRepository = {
  // Create new event
  async create(event: Omit<Event, "id_event">): Promise<string> {
    const docRef = doc(eventsCol);
    await setDoc(docRef, {
      ...event,
      id_event: docRef.id,
      versions: [],
      categories: []
    });
    return docRef.id;
  },

  // Get event by ID
  async getById(id: string): Promise<Event | null> {
    const snap = await getDoc(doc(eventsCol, id));
    return snap.exists() ? snap.data() as Event : null;
  },

  // Add version to event
  async addVersion(eventId: string, versionId: string): Promise<void> {
    await updateDoc(doc(eventsCol, eventId), {
      versions: arrayUnion(versionId)
    });
  },

  // Add category to event
  async addCategory(eventId: string, categoryId: string): Promise<void> {
    await updateDoc(doc(eventsCol, eventId), {
      categories: arrayUnion(categoryId)
    });
  },

  // Get events by category (FIXED VERSION)
  async getByCategory(categoryId: string): Promise<Event[]> {
    const q = query(
      eventsCol, 
      where("categories", "array-contains", categoryId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id_event: doc.id,
      ...doc.data()
    } as Event));
  },
  async nameExists(name: string): Promise<boolean> {
    try {
      const q = query(eventsCol, where("name", "==", name));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking event name:", error);
      throw error;
    }
  },


  // Get event by name
  async getByName(eventName: string): Promise<string | null> {
    const eventsSnapshot = await getDocs(eventsCol);
    const normalizedSearchName = eventName.trim().toLowerCase();
    
    for (const docSnap of eventsSnapshot.docs) {
        const event = docSnap.data() as Event;
        const normalizedEventName = event.name.trim().toLowerCase();
        
        if (normalizedEventName === normalizedSearchName) {
            // Return document ID if id_event doesn't exist
            return event.id_event || docSnap.id; 
        }
    }
    return null;
}
};