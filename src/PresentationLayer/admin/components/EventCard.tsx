// import { useState } from "react";
// import { Check, X } from "lucide-react";
// import "./EventCard.css";

// interface EventCardProps {
//   image: string;
//   eventName: string;
//   clientName: string;
// }

// const EventCard: React.FC<EventCardProps> = ({ image, eventName, clientName }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="event-card-container">
//       {/* Card */}
//       <div className="event-card">
//         <img
//           src={image}
//           alt="Event"
//           className="event-image"
//           onClick={() => setIsOpen(true)}
//         />
//         <div className="event-details">
//           <h2 className="event-title">{eventName}</h2>
//           <p className="event-client">{clientName}</p>
//         </div>
//         <div className="event-actions">
//           <button className="accept-button"><Check size={24} /></button>
//           <button className="reject-button"><X size={24} /></button>
//         </div>
//       </div>
      
//       {/* Modal Popup */}
//       {isOpen && (
//         <div className="modal-overlay" onClick={() => setIsOpen(false)}>
//           <div className="modal-content">
//             <img src={image} alt="Popup" className="modal-image" />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventCard;


// src/components/EventCard.tsx
import { useState } from "react";
import { Check, X } from "lucide-react";
import "./EventCard.css";

interface EventCardProps {
  image: string;
  eventName: string;
  // clientName: string;
  //status: string;
  onAccept: () => void;
  onReject: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  image,
  eventName,
  // clientName,
  //status,
  onAccept,
  onReject,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="event-card-container">
      <div className="event-card">
        <img
          src={image}
          alt="Event"
          className="event-image"
          onClick={() => setIsOpen(true)}
        />
        <div className="event-details">
          <h2 className="event-title">{eventName}</h2>
          {/* <p className="event-client">{clientName}</p> */}
          {/* <p className="event-status">Statut: {status}</p> */}
        </div>
        <div className="event-actions">
          <button className="accept-button" onClick={onAccept}>
            <Check size={20} />
          </button>
          <button className="reject-button" onClick={onReject}>
            <X size={20} />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content">
            <img src={image} alt="Popup" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
