import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { adminRoutes } from "./AdminNavBarRoutes";
import { ParticipantRoutes } from "./ParticipantRoutes";
import { eventCreationRoutes } from "./EventCreationRoutes";

import { authRoutes } from "./authRoute";

import { startRoutes } from "./StartRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {startRoutes}
      {adminRoutes}
      {eventCreationRoutes}
      {authRoutes}
      {ParticipantRoutes}
    </Route>
  )
);
