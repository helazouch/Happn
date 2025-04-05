import { Route } from "react-router-dom";

import UserEventPage from "../../PresentationLayer/participant/UserEventPage";
import Participation from "../../PresentationLayer/participant/Participation";
import ParticipantProfile from "../../PresentationLayer/participant/ParticipantProfile";
import EventDetails from "../../PresentationLayer/participant/VersionDetailsPage";

export const ParticipantRoutes = (
  <>
    <Route path="/user/events" element={<UserEventPage />} />
    <Route path="/user/profile" element={<ParticipantProfile />} />
    <Route path="/user/participation" element={<Participation />} />
    <Route path="/event-details/:id_version" element={<EventDetails />} />
  </>
);

// Inside your Routes:
