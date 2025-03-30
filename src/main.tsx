import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./RoutingLayer/navigation/router";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <RouterProvider router={eventCreationRouter} /> */}
    <RouterProvider router={router} />
    <ToastContainer />

  </React.StrictMode>
);
