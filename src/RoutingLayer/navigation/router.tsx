import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { adminRoutes } from "./AdminNavBarRoutes";
import { eventCreationRoutes } from "./EventCreationRoutes";
import App from "../../App"; // Composant parent (layout principal)

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route >
      {adminRoutes}
      {eventCreationRoutes}
    </Route>
  )
);
