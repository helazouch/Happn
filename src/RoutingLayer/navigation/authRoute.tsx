import { Route } from "react-router-dom";
import SignIn from "../../PresentationLayer/auth/Login";
import SignUp from "../../PresentationLayer/auth/SignUp";
import ParticipantDashboard from "../../PresentationLayer/participant/ParticipantProfile/ParticipantProfile";
import AuthError from "../../PresentationLayer/auth/AuthError";
import Statistics from "../../PresentationLayer/admin/Statistics";

export const authRoutes = (
  <>
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/participant/dashboard" element={<ParticipantDashboard />} />
    <Route path="/admin/statistics" element={<Statistics />} />
    <Route path="/auth-error" element={<AuthError />} />
  </>
);


