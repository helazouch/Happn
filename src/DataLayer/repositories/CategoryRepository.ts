import { db } from "../../ServiceLayer/firebase/firebaseConfig";
import { collection, doc, setDoc, updateDoc, arrayUnion, getDocs, query, where } from "firebase/firestore";
import type { Category } from "../models/Category";

const categoriesCol = collection(db, "categories");
const eventsCol = collection(db, "events");
const versionsCol = collection(db, "versions");

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
  },


  async getCategoriesWithParticipantCount(): Promise<
    Array<{
      categoryId: string;
      name: string;
      participantCount: number;
    }>
  > {
    const categoriesSnapshot = await getDocs(categoriesCol);
    const result = [];
    
    for (const categoryDoc of categoriesSnapshot.docs) {
      const categoryData = categoryDoc.data() as Category;
      
      // Trouver les versions associées à cette catégorie
      const versionsQuery = query(
        versionsCol,
        where("categories", "array-contains", categoryDoc.id)
      );
      const versionsSnapshot = await getDocs(versionsQuery);
      
      const participantCount = versionsSnapshot.docs.reduce(
        (sum, versionDoc) => sum + (versionDoc.data().nbparticipants || 0), 0);
      
      result.push({
        categoryId: categoryDoc.id,
        name: categoryData.nom_category,
        participantCount
      });
    }
    
    return result;
  },

  // Get categories with event count
  async getCategoriesWithEventCount(): Promise<
    Array<{
      categoryId: string;
      name: string;
      eventCount: number;
    }>
  > {
    const categoriesSnapshot = await getDocs(categoriesCol);
    const result = [];
    
    for (const categoryDoc of categoriesSnapshot.docs) {
      const categoryData = categoryDoc.data() as Category;
      
      // Trouver les événements associés à cette catégorie
      const eventsQuery = query(
        eventsCol,
        where("categories", "array-contains", categoryDoc.id)
      );
      const eventsSnapshot = await getDocs(eventsQuery);
      
      result.push({
        categoryId: categoryDoc.id,
        name: categoryData.nom_category,
        eventCount: eventsSnapshot.size
      });
    }
    
    return result;
  }
};