import { useNavigate } from "react-router-dom";

export const useNavigationServiceAuth = () => {
  const navigate = useNavigate();

  return {
    goToSignIn: () => navigate("/sign-in"),
    goToSignUp: () => navigate("/sign-up"),
    goToParticipantDashboard: (userUid:string,userEmail:string,test:string) => {
        sessionStorage.setItem("userId", userUid);
        sessionStorage.setItem("userEmail", userEmail || "");
        sessionStorage.setItem("connexion", test)  //1 email   2google
        navigate("/participant/dashboard");
    },
    goToAdminDashboard: (userUid:string,userEmail:string,test:string) => {
        sessionStorage.setItem("userId", userUid);
        sessionStorage.setItem("userEmail", userEmail || "");
        sessionStorage.setItem("connexion", test)  //1 email   2google
        navigate("/admin/statistics")},
    goToAuthError: () => navigate("/auth-error"),
  };
  
};


