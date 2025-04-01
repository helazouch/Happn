import { useNavigate } from "react-router-dom";

export const useNavigationServiceStart = () => {
    const navigate = useNavigate();

  return {
    goToLandingPage:()=> {
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("userEmail");
      sessionStorage.removeItem("connexion");
      navigate("/");
    },
}

}