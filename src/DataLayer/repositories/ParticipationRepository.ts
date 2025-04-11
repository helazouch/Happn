import { db } from "../../ServiceLayer/firebase/firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  where,
  getFirestore,
  deleteDoc,
} from "firebase/firestore";
import type { Participation } from "../models/Participation";

const participationCol = collection(db, "participations");
const participationsCol = collection(db, "participations");

export const ParticipationRepository = {
  //  Créer une participation
  async create(participation: Omit<Participation, "id">): Promise<string> {
    const docRef = doc(participationCol);
    await setDoc(docRef, {
      ...participation,
      id: docRef.id,
    });
    return docRef.id;
  },

  //  Obtenir une participation par ID
  async getById(id: string): Promise<Participation | null> {
    const snap = await getDoc(doc(participationCol, id));
    return snap.exists() ? (snap.data() as Participation) : null;
  },

  //  Mettre à jour le statut d'une participation
  async updateStatus(
    id: string,
    newStatus: Participation["status"],
    newpaymentVerified:boolean,
  ): Promise<void> {
    await updateDoc(doc(participationCol, id), {
      status: newStatus,
      paymentVerified:newpaymentVerified,
    });
  },

  //  Obtenir toutes les participations
  getAll: async (): Promise<Participation[]> => {
    const snapshot = await getDocs(participationCol);
    return snapshot.docs.map(doc => ({
      id: doc.id, // <-- AJOUT DU CHAMP id
      ...doc.data()
    })) as Participation[];
  },

//   updateStatus: async (id: string, newStatus: Participation["status"]) => {
//     const participationRef = doc(participationCol, id);
//     await updateDoc(participationRef, { status: newStatus });
//   },

  //  Obtenir les participations par statut
  async getByStatus(status: Participation["status"]): Promise<Participation[]> {
    const q = query(participationCol, where("status", "==", status));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as Participation);
  },

  //  Obtenir les participations par événement
  async getByEvent(eventId: string): Promise<Participation[]> {
    const q = query(participationCol, where("eventId", "==", eventId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as Participation);
  },

  //  Obtenir les participations par participant
  async getByParticipant(participantId: string): Promise<Participation[]> {
    const q = query(participationCol, where("participantId", "==", participantId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as Participation);
  },

  getAll1: async (): Promise<Participation[]> => {
    // Créer une requête pour récupérer les participations avec status "pending_payment"
    const q = query(participationCol, where("status", "==", "pending_payment"));
    const snapshot = await getDocs(q);
    const participations = snapshot.docs.map(doc => ({
      id: doc.id, // Ajoute l'id du document
      ...doc.data() // Récupère les autres données du document
    })) as Participation[];
    console.log("hhhh");
    // console.log("Participations trouvées :", participations); // Affiche les résultats dans la console
    return participations;
  },

  async deleteParticipationsByParticipantId(participantId: string): Promise<void> {
    try {
      const db = getFirestore();
      const participationsRef = collection(db, "participations");
      const q = query(participationsRef, where("participantId", "==", participantId));
      const querySnapshot = await getDocs(q);

      const deletePromises = querySnapshot.docs.map((docSnap) =>
        deleteDoc(doc(db, "participations", docSnap.id))
      );

      await Promise.all(deletePromises);
      console.log(`Toutes les participations de ${participantId} ont été supprimées.`);
    } catch (error) {
      console.error("Erreur lors de la suppression des participations :", error);
      throw error;
    }
  },


  // Get participations by version ID
  async getByVersionId(versionId: string): Promise<Participation[]> {
    const q = query(
      participationCol, 
      where("versionId", "==", versionId),
      where("status", "in", ["confirmed", "pending_payment"])
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Participation));
  },

  // Get confirmed participation count for version
  async getConfirmedCount(versionId: string): Promise<number> {
    const q = query(
      participationCol,
      where("versionId", "==", versionId),
      where("status", "==", "confirmed")
    );
    const snapshot = await getDocs(q);
    return snapshot.size;
  },



  // Méthode pour récupérer le nombre de participants avec un statut différent de "cancelled"
  async getParticipantsCountExcludingCancelled(eventId: string, versionId: string): Promise<number> {
    try {
      // Créer une requête pour récupérer les participations avec un statut différent de "cancelled"
      const participationRef = collection(db, "participations");
      const participationQuery = query(
        participationRef,
        where("eventId", "==", eventId),
        where("versionId", "==", versionId),
        where("status", "not-in", ["cancelled"])
      );

      const querySnapshot = await getDocs(participationQuery);

      // Le nombre de participations restantes après filtrage
      return querySnapshot.size;
    } catch (error) {
      console.error("Erreur lors de la récupération du nombre de participants:", error);
      throw new Error("Impossible de récupérer le nombre de participants.");
    }
  }




};
