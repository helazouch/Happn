import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import EventItem from "../common/components/EventItem";
import Filters from "./components/Filters";
import ModifyEventModal from "./components/ModifyEventModal";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";
import { useNavigationServiceEvent } from "../../RoutingLayer/navigation/NavigationServiceEvent";
import { Version } from "../../DataLayer/models/Version";
import "./EventsPage.css";
import { ServiceConnector } from "../../RoutingLayer/apiRoutes/eventRoute";

type EventStatusFilter = "all" | "active" | "canceled";

const EventsPage = () => {
  const navigation = useNavigationServiceEvent();
  const [filters, setFilters] = useState({
    weekdays: "Any",
    categories: [] as string[],
    priceRange: [10, 100] as [number, number],
  });
  const [statusFilter, setStatusFilter] = useState<EventStatusFilter>("all");

  const [events, setEvents] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [urgentEvents, setUrgentEvents] = useState<Version[]>([]);
  const [showUrgentModal, setShowUrgentModal] = useState(false);

  const [showModifyModal, setShowModifyModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Version | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState<string | null>(null);

  // Check for urgent events whenever events change
  useEffect(() => {
    if (events.length > 0) {
      const now = new Date();
      const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      const urgent = events.filter((event) => {
        const eventDate =
          event.date instanceof Date ? event.date : event.date.toDate();
        const isUpcoming = eventDate > now && eventDate <= oneWeekFromNow;
        const isLowAttendance = event.nbparticipants < event.capacity / 2;
        const isActive = !event.canceled;

        return isUpcoming && isLowAttendance && isActive;
      });

      setUrgentEvents(urgent);

      // Show modal automatically if there are urgent events
      if (urgent.length > 0) {
        setShowUrgentModal(true);
      }
    }
  }, [events]);

  // const handleDeleteEvent = async (eventId: string) => {
  //   console.log("Delete triggered for ID:", eventId);

  //   if (!eventId) {
  //     console.error("No event ID provided.");
  //     return;
  //   }

  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to cancel this event?"
  //   );
  //   if (!confirmDelete) return;

  //   try {
  //     await ServiceConnector.updateVersion(eventId, { canceled: true });
  //     setEvents((prevEvents) =>
  //       prevEvents.map((event) =>
  //         event.id_version === eventId ? { ...event, canceled: true } : event
  //       )
  //     );
  //     // Also remove from urgent events if it was there
  //     setUrgentEvents((prev) => prev.filter((e) => e.id_version !== eventId));
  //   } catch (err) {
  //     console.error("Error canceling event:", err);
  //     setError("Failed to cancel event. Please try again.");
  //   }
  // };

  const openDeleteModal = (eventId: string) => {
    setEventIdToDelete(eventId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setEventIdToDelete(null);
    setShowDeleteModal(false);
  };

  const confirmDelete = async () => {
    if (!eventIdToDelete) return;
    try {
      await handleDeleteEvent(eventIdToDelete);
      console.log("Event deleted");
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      closeDeleteModal();
    }
  };
  
  
  const handleDeleteEvent = async (eventId: string) => {
    try {
      await ServiceConnector.updateVersion(eventId, { canceled: true });
  
      // Mise à jour de l'état pour marquer l'événement comme annulé
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id_version === eventId ? { ...event, canceled: true } : event
        )
      );
  
      // Exclure l'événement annulé des événements urgents
      setUrgentEvents((prev) => prev.filter((e) => e.id_version !== eventId));
  
    } catch (err) {
      console.error("Error canceling event:", err);
      setError("Failed to cancel event. Please try again.");
    }
  };
  
  


  const handleModifyEvent = (event: Version) => {
    setSelectedEvent(event);
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

  // Fetch events using ServiceConnector
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError("");

      try {
        const fetchedEvents = await ServiceConnector.getFilteredVersions(
          statusFilter
        );
        setEvents(fetchedEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [statusFilter]);

  // Apply filters
  // const filteredEvents = events.filter((event) => {
  //   const eventDate =
  //     event.date instanceof Date ? event.date : event.date.toDate();

  //   // Status filter is already handled by the ServiceConnector call
  //   const matchesWeekday =
  //     filters.weekdays === "Any" ||
  //     eventDate.toLocaleString("en-US", { weekday: "long" }) ===
  //       filters.weekdays;
  //   const matchesCategory =
  //     filters.categories.length === 0 ||
  //     filters.categories.some((category) =>
  //       event.categories?.includes(category)
  //     );
  //   const matchesPrice =
  //     event.price >= filters.priceRange[0] &&
  //     event.price <= filters.priceRange[1];

  //   return matchesWeekday && matchesCategory && matchesPrice;
  // });

  const filteredEvents = events.filter((event) => {
    const eventDate =
      event.date instanceof Date ? event.date : event.date.toDate();
  
    // Filtrer les événements annulés ici si nécessaire
    if (event.canceled) {
      return false;
    }
  
    const matchesWeekday =
      filters.weekdays === "Any" ||
      eventDate.toLocaleString("en-US", { weekday: "long" }) ===
        filters.weekdays;
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.some((category) =>
        event.categories?.includes(category)
      );
    const matchesPrice =
      event.price >= filters.priceRange[0] && event.price <= filters.priceRange[1];
  
    return matchesWeekday && matchesCategory && matchesPrice;
  });
  

  const handleLoadMore = () => {
    setShowAllEvents(true);
  };

  const handleStatusFilterChange = (filter: EventStatusFilter) => {
    setStatusFilter(filter);
    setShowAllEvents(false);
  };
  const isAuthenticated = sessionStorage.getItem("connexion");
    if (!isAuthenticated || isAuthenticated.trim() === "") {
      return (
        <div style={{ textAlign: "center", marginTop: "100px", fontSize: "24px", color: "red" }}>
          Accès non autorisé
        </div>
      );
    }

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

          {/* Status Filter Controls */}
          <div className="status-filter-container">
            <button
              className={`status-filter-btn ${
                statusFilter === "all" ? "active" : ""
              }`}
              onClick={() => handleStatusFilterChange("all")}
            >
              All Events
            </button>
            <button
              className={`status-filter-btn ${
                statusFilter === "active" ? "active" : ""
              }`}
              onClick={() => handleStatusFilterChange("active")}
            >
              Active Events
            </button>
            <button
              className={`status-filter-btn ${
                statusFilter === "canceled" ? "active" : ""
              }`}
              onClick={() => handleStatusFilterChange("canceled")}
            >
              Canceled Events
            </button>
          </div>

          {loading && <p>Loading events...</p>}
          {error && <p className="error-message">{error}</p>}

          {/* Urgent Events Notification */}
          {urgentEvents.length > 0 && (
            <div className="urgent-notification">
              <h3>Attention Needed!</h3>
              <p>
                You have {urgentEvents.length} event(s) happening soon with low
                attendance. Consider canceling them to free up resources.
              </p>
              <button onClick={() => setShowUrgentModal(true)}>
                View Urgent Events
              </button>
            </div>
          )}

          <div className="events-container">
            {filteredEvents.length > 0
              ? (showAllEvents
                  ? filteredEvents
                  : filteredEvents.slice(0, 3)
                ).map((event) => {
                  const eventDate =
                    event.date instanceof Date
                      ? event.date
                      : event.date.toDate();
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
                    canceled: event.canceled,
                    onDelete: () => openDeleteModal(event.id_version!),
                    onModify: () => handleModifyEvent(event),
                  };

                  return (
                    <EventItem
                      key={event.id_version}
                      {...eventProps}
                      variant="default"
                      isUrgent={urgentEvents.some(
                        (e) => e.id_version === event.id_version
                      )}
                    />
                  );
                })
              : !loading && <p>No events found matching your filters.</p>}
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
      {showDeleteModal && (
    <DeleteConfirmationModal
      show={showDeleteModal}
      onConfirm={confirmDelete}
      onCancel={closeDeleteModal}
    />
  )}

      {/* Urgent Events Modal */}
      {showUrgentModal && (
        <div className="modal-overlay">
          <div className="urgent-events-modal">
            <div className="modal-header">
              <h2>Urgent Events Requiring Attention</h2>
              <button onClick={() => setShowUrgentModal(false)}>×</button>
            </div>
            <div className="modal-content">
              <p>
                The following events are happening soon with low attendance
                (less than 50% capacity):
              </p>
              <ul className="urgent-events-list">
                {urgentEvents.map((event) => {
                  const eventDate =
                    event.date instanceof Date
                      ? event.date
                      : event.date.toDate();
                  return (
                    <li key={event.id_version} className="urgent-event-item">
                      <div className="urgent-event-info">
                        <h3>{event.versionName}</h3>
                        <p>
                          Date: {eventDate.toLocaleDateString()} | Participants:{" "}
                          {event.nbparticipants}/{event.capacity} | Price: $
                          {event.price}
                        </p>
                      </div>
                      <div className="urgent-event-actions">
                        <button
                          onClick={() => handleModifyEvent(event)}
                          className="modify-btn"
                        >
                          Modify
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id_version!)}
                          className="cancel-btn"
                        >
                          Cancel Event
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => setShowUrgentModal(false)}
                className="close-btn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
        
    </div>
  );
};

export default EventsPage;
