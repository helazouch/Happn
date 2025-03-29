import { useState } from "react";
import Navbar from "./components/Navbar";
import EventItem from "../common/components/EventItem";
import Filters from "./components/Filters";
import "./EventsPage.css";
import { useNavigationServiceEvent } from "../../RoutingLayer/navigation/NavigationServiceEvent";
const events = [
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
];

const EventsPage = () => {
  const navigation = useNavigationServiceEvent();
  const [filters, setFilters] = useState({
    weekdays: "Any",
    categories: [] as string[],
    priceRange: [10, 100] as [number, number],
  });

  const filteredEvents = events.filter((event) => {
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

  return (
    <div className="events-page">
      <Navbar />
      <div className="events-layout">
        <Filters onFilterChange={setFilters} />
        <div className="events-content">
          <h1 className="page-title">Our Events</h1>
          <div className="events-container">
            {filteredEvents.map((event, index) => (
              <EventItem
                key={index}
                {...event}
                variant={index === 0 ? "default" : "participate"} // Use "default" for the first event, "participate" for others
              />
            ))}
          </div>
          <button className="add-event-btn" onClick={navigation.goToAddEvent} >Add Event</button>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
