import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";

import AddEvent3 from "./PresentationLayer/admin/AddEvent3";
import Login from "./PresentationLayer/participant/Login/Login";
import ParticipantProfile from "./PresentationLayer/participant/ParticipantProfile/ParticipantProfile";
import SignUp from "./PresentationLayer/participant/Login/SignUp/SignUp";
import LandingPage from "./PresentationLayer/LandingPage/LandingPage";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <EventsPage></EventsPage> */}
    <LandingPage></LandingPage>
  </React.StrictMode>
);
