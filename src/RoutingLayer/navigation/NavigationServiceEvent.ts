import { useNavigate } from "react-router-dom";

export const useNavigationServiceEvent = () => {
  const navigate = useNavigate();

  return {
    goToAddEvent:()=> {
      sessionStorage.removeItem("newEventName");
      sessionStorage.removeItem("newEventOrganizer");
      sessionStorage.removeItem("newEventDescription");
      sessionStorage.removeItem("versionId");
      navigate("/events/new");
    },
    goToMediaPlan:(versionId: string)=> {
      sessionStorage.setItem("versionId", versionId);
      navigate("/events/mediaplan");
    },

    goToAddEventDetails: (eventName: string) => {
      sessionStorage.setItem("newEventName", eventName);
      navigate("/events/new/details");
    },

    goToDuplicateEventModal: (eventName: string) => {
      // Ici tu peux simplement retourner une info ou déclencher l'affichage d'une modale dans ton composant
      sessionStorage.setItem("newEventName", eventName);
    },

    confirmDuplicateAndGoToAddEvent3: (eventName: string,eventId:string) => {
      console.log("Navigating to /events/new/finalize");
      sessionStorage.setItem("currentEventId",eventId);
      sessionStorage.setItem("newEventName", eventName);
      sessionStorage.setItem("newE7ventOrganizer", "");
      sessionStorage.setItem("newEventDescription", "");
      navigate("/events/new/finalize"); 
    },

    cancelDuplicateAndReturnToAddEvent1: (eventName: string) => {
      sessionStorage.setItem("newEventName", eventName);
      navigate("/events/new");
    },

    saveDetailsAndGoToAddEvent3: (
      eventId :string,
      organizer: string,
      description: string
    ) => {
      sessionStorage.setItem("currentEventId", eventId);
      sessionStorage.setItem("newEventOrganizer", organizer);
      sessionStorage.setItem("newEventDescription", description);
      navigate("/events/new/finalize");
    },

    cancelAndReturnToAddEvent1: () => {
      sessionStorage.removeItem("newEventName");
      sessionStorage.removeItem("newEventOrganizer");
      sessionStorage.removeItem("newEventDescription");
      navigate("/events/new"); 
    },
  };
};
