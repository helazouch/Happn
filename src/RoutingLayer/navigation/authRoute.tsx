import { Route } from "react-router-dom";
import SignIn from "../../PresentationLayer/auth/Login";
import SignUp from "../../PresentationLayer/auth/SignUp";
import UserEventPage  from "../../PresentationLayer/participant/UserEventPage"
import AuthError from "../../PresentationLayer/auth/AuthError";
import Statistics from "../../PresentationLayer/admin/Statistics";

export const authRoutes = (
  <>
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/user/events" element={<UserEventPage />}  />
    <Route path="/admin/statistics" element={<Statistics />} />
    <Route path="/auth-error" element={<AuthError />} />
  </>
);


