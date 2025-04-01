
// services/paymentVerification.ts
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs, writeBatch, increment, arrayRemove, doc as firestoreDoc } from "firebase/firestore";
import { Participation } from "../../DataLayer/models/Participation";

const PAYMENT_DEADLINE_HOURS = 48;

export async function checkPendingPayments() {
  const now = new Date();
  const deadline = new Date(now.getTime() - PAYMENT_DEADLINE_HOURS * 60 * 60 * 1000);
  
  const q = query(
    collection(db, "participations"),
    where("status", "==", "pending_payment"),
    where("joinedAt", "<=", deadline)
  );

  const snapshot = await getDocs(q);
  const batch = writeBatch(db);

  snapshot.forEach((document) => {
    const participation = document.data() as Participation;
    
    // Remove participant from version
    const versionRef = firestoreDoc(db, "versions", participation.versionId);
    batch.update(versionRef, {
      participants: arrayRemove(participation.participantId),
      nbparticipants: increment(-1)
    });
    
    // Update participation status
    const participationRef = firestoreDoc(db, "participations", document.id);
    batch.update(participationRef, {
      status: "cancelled",
      cancelledAt: new Date()
    });
  });

  await batch.commit();
}