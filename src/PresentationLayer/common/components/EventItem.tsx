import { FaTrash, FaRegEdit } from "react-icons/fa";
import "./EventItem.css";

type EventItemProps = {
  date: string;
  month: string;
  title: string;
  image: string;
  price: number;
  variant?: "default" | "participate"; // Add variant prop
};

const EventItem: React.FC<EventItemProps> = ({
  date,
  month,
  title,
  image,
  price,
  variant = "default", // Default to "default" variant
}) => {
  return (
    <div className="event-card">
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
            <button className="participate-btn">Participate</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventItem;
