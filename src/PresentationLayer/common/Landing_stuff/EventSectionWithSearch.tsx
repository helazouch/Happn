import React, { useState } from "react";
import "./EventSectionWithSearch.css";
import { Version } from "../../../DataLayer/models/Version";
import { Timestamp } from "firebase/firestore";

interface EventSectionWithSearchProps {
  versions: Version[] | undefined;
}

const EventSectionWithSearch: React.FC<EventSectionWithSearchProps> = ({
  versions = [], // Default to empty array if undefined
}) => {
  const [filters, setFilters] = useState({
    category: "",
    place: "",
    date: "",
  });

  const [visibleCount, setVisibleCount] = useState(6);

  const handleFilterChange = () => {
    const category = (
      document.getElementById("event-name") as HTMLSelectElement
    ).value;
    const place = (document.getElementById("place") as HTMLSelectElement).value;
    const date = (document.getElementById("date") as HTMLSelectElement).value;

    setFilters({
      category,
      place,
      date,
    });
  };

  const filterEvents = () => {
    if (!versions || versions.length === 0) return []; // Return an empty array if no versions

    return versions
      .filter((v) => {
        const eventDate =
          v.date instanceof Timestamp ? v.date.toDate() : v.date;
        const today = new Date();
        const filterDate =
          filters.date === "today"
            ? eventDate.toDateString() === today.toDateString()
            : filters.date === "this-week"
            ? eventDate >= today &&
              eventDate <= new Date(today.setDate(today.getDate() + 7))
            : filters.date === "this-month"
            ? eventDate.getMonth() === today.getMonth() &&
              eventDate.getFullYear() === today.getFullYear()
            : eventDate >= new Date(); // Only show future events if no date filter
        return filterDate;
      })
      .filter((v) => {
        // Apply filters based on selected category, place, and date
        return (
          (filters.category
            ? v.categories?.includes(filters.category)
            : true) && (filters.place ? v.place.includes(filters.place) : true)
        );
      })
      .sort((a, b) => {
        const dateA = a.date instanceof Timestamp ? a.date.toDate() : a.date;
        const dateB = b.date instanceof Timestamp ? b.date.toDate() : b.date;
        return dateA.getTime() - dateB.getTime();
      });
  };

  const upcoming = filterEvents();
  const visibleEvents = upcoming.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="event-section-with-search">
      {/* Event Search Section */}
      <div className="event-search">
        <div className="search-bar">
          {/* Event Category Column */}
          <div className="search-column">
            <label htmlFor="event-name">Event Category</label>
            <select
              id="event-name"
              className="dropdown"
              onChange={handleFilterChange}
            >
              <option value="">Select Category</option>
              <option value="Educational & Training Events">
                Educational & Training Events
              </option>
              <option value="Conferences & Seminars">
                Conferences & Seminars
              </option>
              <option value="Cultural & Entertainment Events">
                Cultural & Entertainment Events
              </option>
              <option value="Sports & Wellness Events">
                Sports & Wellness Events
              </option>
            </select>
          </div>

          {/* Place Column */}
          <div className="search-column">
            <label htmlFor="place">Place</label>
            <select
              id="place"
              className="dropdown"
              onChange={handleFilterChange}
            >
              <option value="">Select Place</option>
              <option value="New York">tunis</option>
              <option value="Los Angeles">ben arous</option>
              <option value="London">manouba</option>
              <option value="Paris">rades</option>
              <option value="Berlin">sfax</option>
            </select>
          </div>

          {/* Date Column */}
          <div className="search-column">
            <label htmlFor="date">Event Date</label>
            <select
              id="date"
              className="dropdown"
              onChange={handleFilterChange}
            >
              <option value="">Select Date</option>
              <option value="today">Today</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="future">Future Events</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="events-section">
        <div className="sorting-menu">
          <div className="upcoming-events-text">Upcoming Events</div>
        </div>

        <div className="events-grid">
          {visibleEvents.map((event) => {
            const dateObj =
              event.date instanceof Timestamp
                ? event.date.toDate()
                : event.date;
            const month = dateObj.toLocaleString("default", { month: "short" });
            const day = dateObj.getDate();

            return (
              <div key={event.id_version} className="event">
                <div className="event-image">
                  <img
                    src={event.img || "/LunarHack.jpg"}
                    alt={event.versionName}
                  />
                </div>
                <div className="event-details">
                  <div className="event-date">
                    <div className="event-month">{month.toUpperCase()}</div>
                    <div className="event-day">{day}</div>
                  </div>
                  <div className="event-description">
                    <div className="event-name">{event.versionName}</div>
                    <div className="event-info">
                      {event.specificDescription}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {visibleCount < upcoming.length && (
          <button className="load-more" onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default EventSectionWithSearch;
