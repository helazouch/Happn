import { useNavigate } from "react-router-dom";

export const useNavigationServiceEvent = () => {
  const navigate = useNavigate();

  return {
    goToAddEvent:()=> {
      sessionStorage.removeItem("newEventName");
      sessionStorage.removeItem("newEventOrganizer");
      sessionStorage.removeItem("newEventDescription");
      navigate("/events/new");
    },

    goToAddEventDetails: (eventName: string) => {
      sessionStorage.setItem("newEventName", eventName);
      navigate("/events/new/details");
    },

    goToDuplicateEventModal: (eventName: string) => {
      // Ici tu peux simplement retourner une info ou déclencher l'affichage d'une modale dans ton composant
      sessionStorage.setItem("newEventName", eventName);
    },

    confirmDuplicateAndGoToAddEvent3: (eventName: string) => {
      console.log("Navigating to /events/new/finalize");
      sessionStorage.setItem("newEventName", eventName);
      sessionStorage.setItem("newEventOrganizer", "");
      sessionStorage.setItem("newEventDescription", "");
      navigate("/events/new/finalize"); 
    },

    cancelDuplicateAndReturnToAddEvent1: (eventName: string) => {
      sessionStorage.setItem("newEventName", eventName);
      navigate("/events/new");
    },

    saveDetailsAndGoToAddEvent3: (
      organizer: string,
      description: string
    ) => {
      sessionStorage.setItem("newEventOrganizer", organizer);
      sessionStorage.setItem("newEventDescription", description);
      navigate("/events/new/finalize");
    }
  };
};
