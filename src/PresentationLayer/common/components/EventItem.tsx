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
  date?: string;
  month?: string;
  title?: string;
  image?: string;
  price: number;
  capacity?: number;
  nbparticipants?: number;
  variant?: "default" | "participate";
};

const EventItem: React.FC<EventItemProps> = ({
  id_version,
  eventId,
  date,
  month,
  title,
  image,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  price,
  capacity,
  nbparticipants,
  variant = "default",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();

  const handleParticipate = async () => {
    if (!currentUser) {
      setError("You must be logged in to participate");
      return;
    }

    if (!id_version || !eventId) {
      setError("Event information is incomplete");
      return;
    }

    if (
      capacity !== undefined &&
      nbparticipants !== undefined &&
      nbparticipants >= capacity
    ) {
      setError("This event has reached maximum capacity");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await updateDoc(doc(db, "versions", id_version), {
        participants: arrayUnion(currentUser.uid),
        nbparticipants: increment(1),
      });

      await addDoc(collection(db, "participations"), {
        versionId: id_version,
        eventId: eventId,
        participantId: currentUser.uid,
        joinedAt: new Date(),
        paymentSubmitted: false,
        paymentVerified: false,
        status: "pending_payment",
      });

      alert(
        "Successfully registered! Please submit your payment proof within 48 hours."
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to register for event. Please try again.");
    } finally {
      setIsLoading(false);
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
              >
                {isLoading ? "Processing..." : "Participate"}
              </button>
              {error && <div className="error-message">{error}</div>}
              <div className="capacity-info-container">
                {capacity !== undefined && nbparticipants !== undefined && (
                  <div
                    className={`capacity-info ${
                      nbparticipants >= capacity ? "full" : ""
                    }`}
                  >
                    {nbparticipants}/{capacity} participants
                    {nbparticipants >= capacity && (
                      <span className="full-badge">FULL</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventItem;
