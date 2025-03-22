import React from "react";
import ReactDOM from "react-dom/client";
import Statistics from "./PresentationLayer/admin/Statistics";
import "./index.css";
import ClientFile from "./PresentationLayer/admin/ClientFile";
import EventsPage from "./PresentationLayer/admin/EventsPage";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <EventsPage></EventsPage>
  </React.StrictMode>
);
