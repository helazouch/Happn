import { Route } from "react-router-dom";
import Statistics from "../../PresentationLayer/admin/Statistics";
import Events from "../../PresentationLayer/admin/EventsPage";
import ClientFile from "../../PresentationLayer/admin/ClientFile";

export const adminRoutes = (
  <>
    <Route path="/admin/statistics" element={<Statistics />} />
    <Route path="/admin/events" element={<Events />} />
    <Route path="/admin/client-file" element={<ClientFile />} />
  </>
);


