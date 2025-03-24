import React from "react";
import ReactDOM from "react-dom/client";
import Statistics from "./PresentationLayer/admin/Statistics";
import "./index.css";
import ClientFile from "./PresentationLayer/admin/ClientFile";
import EventsPage from "./PresentationLayer/admin/EventsPage";
import AddEvent3 from "./PresentationLayer/admin/AddEvent3";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <EventsPage></EventsPage> */}
  <AddEvent3></AddEvent3>
  </React.StrictMode>
);
