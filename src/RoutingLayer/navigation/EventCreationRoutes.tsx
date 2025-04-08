import { Route } from "react-router-dom";
import AddEvent1 from "../../PresentationLayer/admin/AddEvent1";
import AddEvent21 from "../../PresentationLayer/admin/AddEvent21";
import AddEvent3 from "../../PresentationLayer/admin/AddEvent3";
import MediaPlan from "../../PresentationLayer/admin/PlanMedia";

export const eventCreationRoutes = (
  <>
    <Route path="/events/new" element={<AddEvent1 />} />
    <Route path="/events/new/details" element={<AddEvent21 />} />
    <Route path="/events/new/finalize" element={<AddEvent3 />} />
    <Route path="/events/mediaplan" element={<MediaPlan />} />  
  </>
);
