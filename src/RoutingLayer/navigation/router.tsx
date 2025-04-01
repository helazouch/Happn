import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { adminRoutes } from "./AdminNavBarRoutes";
import { eventCreationRoutes } from "./EventCreationRoutes";
import App from "../../App"; // Composant parent (layout principal)
import { authRoutes } from "./authRoute";
import LandingPage from "../../PresentationLayer/common/LandingPage";
import { startRoutes } from "./StartRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route >
      {startRoutes}
      {adminRoutes}
      {eventCreationRoutes}
      {authRoutes}
    </Route>
  )
);
