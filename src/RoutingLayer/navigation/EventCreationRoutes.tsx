import { createBrowserRouter } from "react-router-dom";
import AddEvent1 from "../../PresentationLayer/admin/AddEvent1";
import AddEvent21 from "../../PresentationLayer/admin/AddEvent21";
import AddEvent3 from "../../PresentationLayer/admin/AddEvent3";

export const eventCreationRouter = createBrowserRouter([
  {
    path: "/events/new",
    element: <AddEvent1 />,
  },
  {
    path: "/events/new/details",
    element: <AddEvent21 />,
  },
  {
    path: "/events/new/finalize",
    element: <AddEvent3 />,
  },
]);
