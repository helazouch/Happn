import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import AddEvent3 from "./PresentationLayer/admin/AddEvent3";
import Login from "./PresentationLayer/participant/Login/Login";
import ParticipantProfile from "./PresentationLayer/participant/ParticipantProfile/ParticipantProfile";
import SignUp from "./PresentationLayer/participant/Login/SignUp/SignUp";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <EventsPage></EventsPage> */}
    <SignUp></SignUp>
    <Login></Login>
  </React.StrictMode>
);
