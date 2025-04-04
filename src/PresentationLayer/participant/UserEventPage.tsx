import { useState, useEffect } from "react";
import NavbarParticipant from "./components/NavbarParticipant";
import EventItem from "../common/components/EventItem";
import Filters from "../admin/components/Filters";
import { db } from "../../ServiceLayer/firebase/firebaseConfig"; // Import your Firebase config here
import { collection, getDocs, Timestamp } from "firebase/firestore"; // Firebase Firestore functions
import { useNavigationServiceEvent } from "../../RoutingLayer/navigation/NavigationServiceEvent";
import { Version } from "../../DataLayer/models/Version"; // Assuming the interface is in the models folder
import "./UserEventPage.css";

const UserEventsPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigation = useNavigationServiceEvent();
  const [filters, setFilters] = useState({
    weekdays: "Any",
    categories: [] as string[],
    priceRange: [-Infinity, Infinity] as [number, number], // Initially no price filter
  });

  const [events, setEvents] = useState<Version[]>([]); // Store fetched events
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [showAllEvents, setShowAllEvents] = useState(false); // To track "Load More" button click

  // Fetch events from Firebase Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError("");

      try {
        const querySnapshot = await getDocs(collection(db, "versions"));
        const fetchedEvents: Version[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
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
          };
        });

        setEvents(fetchedEvents); // Update the state with fetched events
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

  // Handle Load More button click
  const handleLoadMore = () => {
    setShowAllEvents(true);
  };

  return (
    <div className="events-page">
      <NavbarParticipant />
      <div className="events-layout">
        <Filters onFilterChange={setFilters} />
        <div className="events-content">
          <h1 className="page-title">Our Events</h1>

          {/* Show loading message */}
          {loading && <p>Loading events...</p>}

          {/* Show error message */}
          {error && <p className="error-message">{error}</p>}

          <div className="events-container">
            {filteredEvents.length > 0
              ? (showAllEvents
                  ? filteredEvents
                  : filteredEvents.slice(0, 3)
                ).map((event, index) => {
                  // Map the missing properties for EventItem
                  const eventProps = {
                    ...event,
                    month: event.date.toLocaleString("en-US", {
                      month: "short",
                    }),
                    title: event.versionName, // You can use versionName as title or customize this as needed
                    image: event.img || "/src/assets/default-event.jpg", // Assuming 'img' contains the image URL
                    weekday: event.date.toLocaleString("en-US", {
                      weekday: "long",
                    }), // Get weekday name
                    date: String(
                      (event.date instanceof Timestamp
                        ? event.date.toDate()
                        : event.date
                      ).getDate()
                    ),
                    // Convert date to string
                  };
                  return (
                    <EventItem
                      key={index}
                      {...eventProps}
                      variant={"participate"}
                    />
                  );
                })
              : !loading && <p>No events found.</p>}
          </div>

          {/* Load More Button */}
          {!showAllEvents && filteredEvents.length > 3 && (
            <button className="load-more-btn" onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserEventsPage;
