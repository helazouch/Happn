import { Route } from "react-router-dom";

import UserEventPage from "../../PresentationLayer/participant/components/UserEventPage";

export const UserRoutes = (
  <>
    <Route path="/user/events" element={<UserEventPage />} />
  </>
);

// Inside your Routes:
