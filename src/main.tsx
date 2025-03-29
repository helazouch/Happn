import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { eventCreationRouter } from "./RoutingLayer/navigation/EventCreationRoutes";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={eventCreationRouter} />
  </React.StrictMode>
);