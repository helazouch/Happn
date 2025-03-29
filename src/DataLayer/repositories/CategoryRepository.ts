import { db } from "../../ServiceLayer/firebase/firebaseConfig";
import { collection, doc, setDoc, updateDoc, arrayUnion, getDocs } from "firebase/firestore";
import type { Category } from "../models/Category";

const categoriesCol = collection(db, "categories");

export const CategoryRepository = {
  // Create new category
  async create(category: Omit<Category, "id_category">): Promise<string> {
    const docRef = doc(categoriesCol);
    await setDoc(docRef, {
      ...category,
      id_category: docRef.id,
      related_events: []
    });
    return docRef.id;
  },

  // Link event to category
  async linkEvent(categoryId: string, eventId: string): Promise<void> {
    await updateDoc(doc(categoriesCol, categoryId), {
      related_events: arrayUnion(eventId)
    });
  },

  // Get all categories
  async getAll(): Promise<Category[]> {
    const snapshot = await getDocs(categoriesCol);
    return snapshot.docs.map(doc => doc.data() as Category);
  }
};