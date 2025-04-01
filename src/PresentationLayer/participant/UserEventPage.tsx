import { useState, useEffect } from "react";
import Navbar from "./components/NavbarUser";
import EventItem from "../common/components/EventItem";
import Filters from "../admin/components/Filters";
// import "../../admin/EventsPage.css";
import { useNavigationServiceEvent } from "../../RoutingLayer/navigation/NavigationServiceEvent";
import "./UserEventPAge.css";

interface Event {
  date: string;
  month: string;
  title: string;
  image: string;
  category: string;
  price: number;
  weekday: string;
}

const allEvents: Event[] = [
  // Your existing events data
  {
    date: "14",
    month: "APR",
    title: "Wonder Girls 2010 Wonder Girls World Tour San Francisco",
    image: "/src/assets/event1.jpg",
    category: "Cultural & Entertainment Events",
    price: 50,
    weekday: "Friday",
  },
  {
    date: "20",
    month: "AUG",
    title: "JYJ 2011 JYJ Worldwide Concert Barcelona",
    image: "/src/assets/event1.jpg",
    category: "Cultural & Entertainment Events",
    price: 75,
    weekday: "Saturday",
  },
  {
    date: "18",
    month: "SEP",
    title: "2011 Super Junior SM Town Live '10 World Tour New York City",
    image: "/src/assets/event1.jpg",
    category: "Cultural & Entertainment Events",
    price: 100,
    weekday: "Sunday",
  },
  {
    date: "05",
    month: "MAY",
    title: "Spring Music Festival 2023",
    image: "/src/assets/event1.jpg",
    category: "Music Festivals",
    price: 65,
    weekday: "Friday",
  },
  {
    date: "12",
    month: "JUN",
    title: "International Food Fair",
    image: "/src/assets/event1.jpg",
    category: "Food & Drink",
    price: 30,
    weekday: "Saturday",
  },
];

const UserEventsPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigation = useNavigationServiceEvent();
  const [filters, setFilters] = useState({
    weekdays: "Any",
    categories: [] as string[],
    priceRange: [10, 100] as [number, number],
  });
  const [visibleEvents, setVisibleEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3;

  // Apply filters
  const filteredEvents = allEvents.filter((event) => {
    const matchesWeekday =
      filters.weekdays === "Any" || event.weekday === filters.weekdays;
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(event.category);
    const matchesPrice =
      event.price >= filters.priceRange[0] &&
      event.price <= filters.priceRange[1];
    return matchesWeekday && matchesCategory && matchesPrice;
  });

  // Handle pagination and reset when filters change
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters]);

  // Update visible events when page or filtered events change
  useEffect(() => {
    setVisibleEvents(filteredEvents.slice(0, currentPage * eventsPerPage));
  }, [filteredEvents, currentPage]);

  const loadMoreEvents = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const hasMoreEvents = visibleEvents.length < filteredEvents.length;

  return (
    <div className="events-page">
      <Navbar />
      <div className="events-layout">
        <Filters
          onFilterChange={(newFilters) => {
            setFilters(newFilters);
          }}
        />
        <div className="events-content">
          <h1 className="page-title">Our Events</h1>
          <div className="events-container">
            {visibleEvents.map((event, index) => (
              <EventItem key={index} {...event} variant="participate" />
            ))}
          </div>
          {hasMoreEvents && (
            <button className="load-more-btn" onClick={loadMoreEvents}>
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserEventsPage;
