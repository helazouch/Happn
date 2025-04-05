import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import EventItem from "../common/components/EventItem";
import Filters from "./components/Filters";
import ModifyEventModal from "./components/ModifyEventModal";
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

  const [showModifyModal, setShowModifyModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Version | null>(null);

  const handleDeleteEvent = async (eventId: string) => {
    console.log("Delete triggered for ID:", eventId);

    if (!eventId) {
      console.error("No event ID provided.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) return;

    try {
      await ServiceConnector.updateVersion(eventId, { canceled: true });
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id_version === eventId ? { ...event, canceled: true } : event
        )
      );
    } catch (err) {
      console.error("Error deleting event:", err);
      setError("Failed to delete event. Please try again.");
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
  const filteredEvents = events.filter((event) => {
    const eventDate =
      event.date instanceof Date ? event.date : event.date.toDate();

    // Status filter is already handled by the ServiceConnector call
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
      event.price >= filters.priceRange[0] &&
      event.price <= filters.priceRange[1];

    return matchesWeekday && matchesCategory && matchesPrice;
  });

  const handleLoadMore = () => {
    setShowAllEvents(true);
  };

  const handleStatusFilterChange = (filter: EventStatusFilter) => {
    setStatusFilter(filter);
    setShowAllEvents(false);
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
    </div>
  );
};

export default EventsPage;
