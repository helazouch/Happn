// import { useState } from "react";
// import { FaTrash, FaRegEdit } from "react-icons/fa";
// import {
//   arrayUnion,
//   doc,
//   updateDoc,
//   increment,
//   addDoc,
//   collection,
//   getDoc,
// } from "firebase/firestore";
// import { db } from "../../../ServiceLayer/firebase/firebaseConfig.ts";
// import { useAuth } from "../../../Contexts/AuthContext.tsx";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import "./EventItem.css";

// type EventItemProps = {
//   id_version?: string;
//   eventId?: string;
//   date?: string;
//   month?: string;
//   title?: string;
//   image?: string;
//   price: number;
//   capacity?: number;
//   nbparticipants?: number;
//   variant?: "default" | "participate";
//   isUrgent?: boolean; // Add this line

//   onDelete?: (eventId: string) => void;
//   onModify?: (eventId: string) => void;
// };

// const EventItem: React.FC<EventItemProps> = ({
//   id_version,
//   eventId,
//   date,
//   month,
//   title,
//   image,
//   capacity,
//   nbparticipants = 0,
//   variant = "default",
//   onDelete,
//   onModify,
// }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [currentParticipants, setCurrentParticipants] =
//     useState(nbparticipants);
//   const { currentUser } = useAuth();
//   const navigate = useNavigate(); // Initialize navigate

//   const handleParticipate = async () => {
//     if (!currentUser) {
//       setError("You must be logged in to participate");
//       return;
//     }

//     if (!id_version || !eventId) {
//       setError("Event information is incomplete");
//       return;
//     }

//     setIsLoading(true);
//     setError("");

//     const eventRef = doc(db, "versions", id_version);

//     try {
//       const eventSnapshot = await getDoc(eventRef);

//       if (eventSnapshot.exists()) {
//         const eventData = eventSnapshot.data();

//         if (
//           eventData.participants &&
//           eventData.participants.includes(currentUser.uid)
//         ) {
//           setError("You're already registered for this event");
//           setIsLoading(false);
//           return;
//         }

//         if (capacity !== undefined && currentParticipants >= capacity) {
//           setError("This event has reached maximum capacity");
//           setIsLoading(false);
//           return;
//         }

//         await updateDoc(eventRef, {
//           participants: arrayUnion(currentUser.uid),
//           nbparticipants: increment(1),
//         });

//         await addDoc(collection(db, "participations"), {
//           versionId: id_version,
//           eventId: eventId,
//           participantId: currentUser.uid,
//           joinedAt: new Date(),
//           paymentSubmitted: false,
//           paymentVerified: false,
//           status: "no_payement",
//         });

//         setCurrentParticipants((prev) => prev + 1);
//         alert(
//           "Successfully registered! Please submit your payment proof within 48 hours."
//         );
//       } else {
//         setError("Event not found");
//       }
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (err) {
//       setError("Failed to register for event. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!id_version) return;

//     setIsLoading(true);
//     try {
//       onDelete?.(id_version); // This calls handleDeleteEvent from parent
//     } catch (err) {
//       console.error("Delete error:", err);
//       setError("Failed to delete event.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleModify = () => {
//     if (!id_version) return;
//     onModify?.(id_version);
//   };

//   // Handle image click to navigate to event details page
//   const handleImageClick = () => {
//     if (id_version) {
//       navigate(`/event-details/${id_version}`); // Navigate to the event details page using the id_version
//     }
//   };

//   return (
//     <div className={`event-card21 ${variant}`}>
//       <img
//         src={image}
//         alt={title}
//         className="event-image1"
//         onClick={handleImageClick} // Add the onClick handler to the image
//       />

//       <div className="event-content21">
//         <div className="event-header21">
//           <div className="event-date">
//             <span className="month">{month}</span>
//             <span className="date">{date}</span>
//           </div>
//           <div className="event-title">{title}</div>
//         </div>

//         <div className="event-icons">
//           {variant === "default" ? (
//             <div className="admin-actions">
//               <button
//                 className="action-button"
//                 onClick={handleModify}
//                 disabled={isLoading}
//               >
//                 <FaRegEdit className="edit-icon" />
//               </button>
//               <button
//                 className="action-button"
//                 onClick={handleDelete}
//                 disabled={isLoading}
//               >
//                 <FaTrash className="delete-icon" />
//               </button>
//             </div>
//           ) : (
//             <div className="participation-section">
//               <button
//                 className="participate-btn"
//                 onClick={handleParticipate}
//                 disabled={
//                   isLoading ||
//                   (capacity !== undefined && currentParticipants >= capacity)
//                 }
//               >
//                 {isLoading ? "Processing..." : "Participate"}
//               </button>
//               {error && <div className="error-message">{error}</div>}
//               <div className="capacity-info-container">
//                 {capacity !== undefined && (
//                   <div
//                     className={`capacity-info ${
//                       currentParticipants >= capacity ? "full" : ""
//                     }`}
//                   >
//                     {currentParticipants}/{capacity} participants
//                     {currentParticipants >= capacity && (
//                       <span className="full-badge">FULL</span>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventItem;


import { useState } from "react";
import { FaTrash, FaRegEdit, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
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
import { useNavigate } from "react-router-dom";
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
  isUrgent?: boolean;
  onDelete?: (eventId: string) => void;
  onModify?: (eventId: string) => void;
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
  onDelete,
  onModify,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentParticipants, setCurrentParticipants] = useState(nbparticipants);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // États pour la modale
  const [showModal, setShowModal] = useState(false);
  const [modalStatus, setModalStatus] = useState<"success" | "error" | null>(null);
  const [modalMessage, setModalMessage] = useState("");

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
    setShowModal(true);
    setModalStatus(null);
    setModalMessage("Processing your registration...");

    const eventRef = doc(db, "versions", id_version);

    try {
      const eventSnapshot = await getDoc(eventRef);

      if (eventSnapshot.exists()) {
        const eventData = eventSnapshot.data();

        if (eventData.participants && eventData.participants.includes(currentUser.uid)) {
          setModalStatus("error");
          setModalMessage("You're already registered for this event");
          setIsLoading(false);
          return;
        }

        if (capacity !== undefined && currentParticipants >= capacity) {
          setModalStatus("error");
          setModalMessage("This event has reached maximum capacity");
          setIsLoading(false);
          return;
        }

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

        setCurrentParticipants((prev) => prev + 1);
        setModalStatus("success");
        setModalMessage("Successfully registered! Please submit your payment proof within 48 hours.");
      } else {
        setModalStatus("error");
        setModalMessage("Event not found");
      }
    } catch (err) {
      setModalStatus("error");
      setModalMessage("Failed to register for event. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalStatus(null);
    setModalMessage("");
  };
    const handleDelete = async () => {
    if (!id_version) return;

    setIsLoading(true);
    try {
      onDelete?.(id_version); // This calls handleDeleteEvent from parent
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete event.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModify = () => {
    if (!id_version) return;
    onModify?.(id_version);
  };

  // Handle image click to navigate to event details page
  const handleImageClick = () => {
    if (id_version) {
      navigate(`/event-details/${id_version}`); // Navigate to the event details page using the id_version
    }
  };

  // ... (le reste de votre code reste inchangé jusqu'au return)

  return (
    <div className={`event-card21 ${variant}`}>
      <img
        src={image}
        alt={title}
        className="event-image1"
        onClick={handleImageClick}
      />

      <div className="event-content21">
        <div className="event-header21">
          <div className="event-date">
            <span className="month">{month}</span>
            <span className="date">{date}</span>
          </div>
          <div className="event-title">{title}</div>
        </div>

        <div className="event-icons">
          {variant === "default" ? (
            <div className="admin-actions">
              <button
                className="action-button"
                onClick={handleModify}
                disabled={isLoading}
              >
                <FaRegEdit className="edit-icon" />
              </button>
              <button
                className="action-button"
                onClick={handleDelete}
                disabled={isLoading}
              >
                <FaTrash className="delete-icon" />
              </button>
            </div>
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

      {/* Modal de participation */}
      {showModal && (
        <div className="modal-overlay">
          <div className={`participation-modal ${modalStatus || "loading"}`}>
            {modalStatus ? (
              <>
                <div className="modal-icon">
                  {modalStatus === "success" ? (
                    <FaCheckCircle className="success-icon" />
                  ) : (
                    <FaTimesCircle className="error-icon" />
                  )}
                </div>
                <h3>{modalMessage}</h3>
                <button className="modal-close-btn" onClick={closeModal}>
                  OK
                </button>
              </>
            ) : (
              <>
                <div className="loading-spinner"></div>
                <h3>{modalMessage}</h3>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventItem;

