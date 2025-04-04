import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import EventItem from "../common/components/EventItem";
import Filters from "./components/Filters";
import { db } from "../../ServiceLayer/firebase/firebaseConfig";
import ModifyEventModal from "./components/ModifyEventModal";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { useNavigationServiceEvent } from "../../RoutingLayer/navigation/NavigationServiceEvent";
import { Version } from "../../DataLayer/models/Version";
import "./EventsPage.css";

const EventsPage = () => {
  const navigation = useNavigationServiceEvent();
  const [filters, setFilters] = useState({
    weekdays: "Any",
    categories: [] as string[],
    priceRange: [10, 100] as [number, number],
  });

  const [events, setEvents] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAllEvents, setShowAllEvents] = useState(false);

  // Add these state declarations for the modify modal
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Version | null>(null);

  const handleDeleteEvent = async (eventId: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteDoc(doc(db, "versions", eventId));
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id_version !== eventId)
        );
      } catch (err) {
        console.error("Error deleting event:", err);
        setError("Failed to delete event. Please try again.");
      }
    }
  };

  const handleModifyEvent = (event: Version) => {
    setSelectedEvent({
      ...event,
      date: event.date instanceof Timestamp ? event.date.toDate() : event.date,
    });
    setShowModifyModal(true);
  };

  const handleEventUpdated = (updatedEvent: Version) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id_version === updatedEvent.id_version ? updatedEvent : event
      )
    );
    setShowModifyModal(false);
  };

  // Fetch events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError("");

      try {
        const querySnapshot = await getDocs(collection(db, "versions"));
        const fetchedEvents: Version[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedEvents.push({
            id_version: doc.id,
            versionName: data.versionName || "Unknown Version",
            specificDescription: data.specificDescription || "No description",
            date:
              data.date instanceof Timestamp ? data.date.toDate() : new Date(),
            place: data.place || "Unknown Place",
            price: data.price || 0,
            planning: data.planning || "Not Specified",
            img: data.img || "/CyberHorizon.jpg",
            nbparticipants: data.nbparticipants || 0,
            capacity: data.capacity || 0,
            plan_mediatique: data.plan_mediatique || "Not Specified",
            eventId: data.eventId || "Unknown Event",
            participants: data.participants || [],
            categories: data.categories || [],
          });
        });

        setEvents(fetchedEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Apply filters
  const filteredEvents = events.filter((event) => {
    const matchesWeekday =
      filters.weekdays === "Any" ||
      event.date.toLocaleString("en-US", { weekday: "long" }) ===
        filters.weekdays;
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.some((category) =>
        event.categories?.includes(category)
      );
    const matchesPrice =
      event.price >= filters.priceRange[0] &&
      event.price <= filters.priceRange[1];

    return matchesWeekday && matchesCategory && matchesPrice;
  });

  const handleLoadMore = () => {
    setShowAllEvents(true);
  };

  return (
    <div className="events-page-events">
      <Navbar />
      <div className="events-layout">
        <Filters onFilterChange={setFilters} />
        <div className="events-content">
          <div className="page-header-events">
            <h1 className="page-title">Our Events</h1>
            <button className="add-event-btn" onClick={navigation.goToAddEvent}>
              +
            </button>
          </div>

          {loading && <p>Loading events...</p>}
          {error && <p className="error-message">{error}</p>}

          <div className="events-container">
            {filteredEvents.length > 0
              ? (showAllEvents
                  ? filteredEvents
                  : filteredEvents.slice(0, 3)
                ).map((event) => {
                  const eventDate =
                    event.date instanceof Timestamp
                      ? event.date.toDate()
                      : event.date;
                  const eventProps = {
                    id_version: event.id_version,
                    eventId: event.eventId,
                    month: eventDate.toLocaleString("en-US", {
                      month: "short",
                    }),
                    title: event.versionName,
                    image: event.img || "/src/assets/default-event.jpg",
                    weekday: eventDate.toLocaleString("en-US", {
                      weekday: "long",
                    }),
                    date: String(eventDate.getDate()),
                    category: event.categories?.join(", ") || "Uncategorized",
                    price: event.price,
                    capacity: event.capacity,
                    nbparticipants: event.nbparticipants,
                    onDelete: () => handleDeleteEvent(event.id_version!),
                    onModify: () => handleModifyEvent(event),
                  };

                  return (
                    <EventItem
                      key={event.id_version}
                      {...eventProps}
                      variant="default"
                    />
                  );
                })
              : !loading && <p>No events found.</p>}
          </div>

          {!showAllEvents && filteredEvents.length > 3 && (
            <button className="load-more-btn" onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </div>
      </div>

      {showModifyModal && selectedEvent && (
        <ModifyEventModal
          show={showModifyModal}
          onClose={() => setShowModifyModal(false)}
          onSuccess={handleEventUpdated}
          eventData={selectedEvent}
        />
      )}
    </div>
  );
};

export default EventsPage;
