import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { adminRoutes } from "./AdminNavBarRoutes";
import { eventCreationRoutes } from "./EventCreationRoutes";
import { UserRoutes } from "./ParticipantRoutes";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {adminRoutes}
      {eventCreationRoutes}
      {UserRoutes}
    </Route>
  )
);
