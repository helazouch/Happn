import { useNavigate } from "react-router-dom";

export const useNavigationServiceAdminNavBar = () => {
  const navigate = useNavigate();

  return {
    goToStatistics: () => navigate("/admin/statistics"),
    goToEvents: () => navigate("/admin/events"),
    goToClientFile: () => navigate("/admin/client-file"),
  };
};
