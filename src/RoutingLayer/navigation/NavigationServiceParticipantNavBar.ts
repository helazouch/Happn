import { useNavigate } from "react-router-dom";

export const useNavigationServiceParticipantNavBar = () => {
  const navigate = useNavigate();

  return {
    goToEvents: () => navigate("/user/events"),
    goToProfile: () => navigate("/user/profile"),
    goToParticipation: () => navigate("/admin/participation"),
  };

}