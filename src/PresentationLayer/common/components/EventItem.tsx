import { useState } from "react";
import { FaTrash, FaRegEdit } from "react-icons/fa";
import {
  arrayUnion,
  doc,
  updateDoc,
  increment,
  addDoc,
  collection,
  getDoc,
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
  capacity,
  nbparticipants = 0,
  variant = "default",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentParticipants, setCurrentParticipants] =
    useState(nbparticipants); // Dynamic state
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

    setIsLoading(true);
    setError("");

    const eventRef = doc(db, "versions", id_version);

    try {
      const eventSnapshot = await getDoc(eventRef);

      if (eventSnapshot.exists()) {
        const eventData = eventSnapshot.data();

        // Check if the user is already registered
        if (
          eventData.participants &&
          eventData.participants.includes(currentUser.uid)
        ) {
          setError("You're already registered for this event");
          setIsLoading(false);
          return;
        }

        // Check if event is full
        if (capacity !== undefined && currentParticipants >= capacity) {
          setError("This event has reached maximum capacity");
          setIsLoading(false);
          return;
        }

        // Proceed with registration
        await updateDoc(eventRef, {
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
          status: "no_payement",
        });

        // Update the participant count locally
        setCurrentParticipants((prev) => prev + 1);

        alert(
          "Successfully registered! Please submit your payment proof within 48 hours."
        );
      } else {
        setError("Event not found");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to register for event. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`event-card ${variant}`}>
      <img src={image} alt={title} className="event-image1" />

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
                  (capacity !== undefined && currentParticipants >= capacity)
                }
              >
                {isLoading ? "Processing..." : "Participate"}
              </button>
              {error && <div className="error-message">{error}</div>}
              <div className="capacity-info-container">
                {capacity !== undefined && (
                  <div
                    className={`capacity-info ${
                      currentParticipants >= capacity ? "full" : ""
                    }`}
                  >
                    {currentParticipants}/{capacity} participants
                    {currentParticipants >= capacity && (
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
