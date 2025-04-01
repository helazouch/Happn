import { useState } from "react";
import { FaTrash, FaRegEdit } from "react-icons/fa";
import {
  arrayUnion,
  doc,
  updateDoc,
  increment,
  addDoc,
  collection,
} from "firebase/firestore";
import { db } from "../../../ServiceLayer/firebase/firebaseConfig.ts";
import { useAuth } from "../../../Contexts/AuthContext.tsx";
import "./EventItem.css";

type EventItemProps = {
  id_version?: string;
  eventId?: string;
  date: string;
  month: string;
  title: string;
  image: string;
  price: number;
  capacity?: number;
  nbparticipants?: number;
  variant?: "default" | "participate";
  // Add test mode prop
  testMode?: boolean;
};

const EventItem: React.FC<EventItemProps> = ({
  id_version,
  eventId,
  date,
  month,
  title,
  image,
  price,
  capacity,
  nbparticipants,
  variant = "default",
  testMode = false, // Default to false for production
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();

  const handleParticipate = async () => {
    console.log("[DEBUG] Participate button clicked");
    console.log("[DEBUG] Current auth state:", { currentUser, testMode });

    if (testMode) {
      // Test mode behavior
      console.log("[TEST] Would attempt participation with:", {
        id_version,
        eventId,
        user: currentUser?.uid || "no-user",
      });
      alert("[TEST MODE] Participation would be registered");
      return;
    }

    if (!currentUser) {
      setError("You must be logged in to participate");
      console.warn("[AUTH] No user logged in");
      return;
    }

    if (!id_version || !eventId) {
      setError("Event information is incomplete");
      console.error("[DATA] Missing version or event ID");
      return;
    }

    if (
      capacity !== undefined &&
      nbparticipants !== undefined &&
      nbparticipants >= capacity
    ) {
      setError("This event has reached maximum capacity");
      console.warn("[CAPACITY] Event full");
      return;
    }

    setIsLoading(true);
    setError("");
    console.log("[LOADING] Starting participation process");

    try {
      // Update version document
      if (id_version) {
        console.log("[FIRESTORE] Attempting to update version document");
        await updateDoc(doc(db, "versions", id_version), {
          participants: arrayUnion(currentUser.uid),
          nbparticipants: increment(1),
        });
        console.log("[SUCCESS] Version document updated");
      }

      // Create participation record
      console.log("[FIRESTORE] Creating participation record");
      await addDoc(collection(db, "participations"), {
        versionId: id_version,
        eventId: eventId,
        participantId: currentUser.uid,
        joinedAt: new Date(),
        paymentSubmitted: false,
        paymentVerified: false,
        status: "pending_payment",
      });
      console.log("[SUCCESS] Participation record created");

      alert(
        "Successfully registered! Please submit your payment proof within 48 hours."
      );
    } catch (err) {
      const errorMsg = "Failed to register for event. Please try again.";
      setError(errorMsg);
      console.error("[ERROR]", err);
      console.error("[FULL ERROR]", JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
      console.log("[LOADING] Participation process completed");
    }
  };

  return (
    <div className={`event-card ${variant}`}>
      <img src={image} alt={title} className="event-image" />
      <div className="event-content">
        <div className="event-header">
          <div className="event-date">
            <span className="month">{month}</span>
            <span className="date">{date}</span>
          </div>
          <div className="event-title">{title}</div>
        </div>
        <div className="event-price">{price} DT</div>
        <div className="event-icons">
          {variant === "default" ? (
            <>
              <FaRegEdit className="edit-icon" />
              <FaTrash className="delete-icon" />
            </>
          ) : (
            <div className="participation-section">
              <button
                className="participate-btn"
                onClick={handleParticipate}
                disabled={
                  isLoading ||
                  (capacity !== undefined &&
                    nbparticipants !== undefined &&
                    nbparticipants >= capacity)
                }
                data-testid="participate-button"
              >
                {isLoading ? "Processing..." : "Participate"}
                {testMode && " (Test Mode)"}
              </button>
              {error && (
                <div className="error-message" data-testid="error-message">
                  {error}
                </div>
              )}
              {capacity !== undefined && nbparticipants !== undefined && (
                <div
                  className={`capacity-info ${
                    nbparticipants >= capacity ? "full" : ""
                  }`}
                  data-testid="capacity-info"
                >
                  {nbparticipants}/{capacity} participants
                  {nbparticipants >= capacity && (
                    <span className="full-badge">FULL</span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {testMode && (
        <div className="test-mode-banner">
          TEST MODE ACTIVE - No real database operations
        </div>
      )}
    </div>
  );
};

export default EventItem;
