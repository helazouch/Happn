import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { eventCreationRouter } from "./RoutingLayer/navigation/EventCreationRoutes";
import "./index.css";
import AddEvent1 from "./PresentationLayer/admin/AddEvent1";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={eventCreationRouter} />
    <AddEvent1></AddEvent1>
  </React.StrictMode>
);
