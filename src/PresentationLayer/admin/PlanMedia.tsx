import { useState } from "react";
import "./PlanMedia.css";
import { askGemini } from "../../ServiceLayer/externalServices/AIService.ts";
import { useNavigationServiceAdminNavBar } from "../../RoutingLayer/navigation/NavigationServiceAdminNavBar.ts";
import { VersionRepository } from "../../DataLayer/repositories/VersionRepository.ts";

const PlanMedia: React.FC = () => {
  const navigation = useNavigationServiceAdminNavBar();
  const [aiResponse, setAiResponse] = useState<string>("Waiting for response...");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasAccepted, setHasAccepted] = useState<boolean>(false);
  const versionId = sessionStorage.getItem("versionId");
  // Nouvelle variable d’état pour garder la vraie réponse IA (utile pour l'update)
  const [mediaPlanContent, setMediaPlanContent] = useState<string>("");

  const fetchResponse = async () => {
    try {
      setIsLoading(true);
      setAiResponse("Generating response...");

      const versionId = sessionStorage.getItem("versionId");

      if (!versionId) {
        throw new Error("versionId not found in sessionStorage");
      }

      const question = "Give me a media plan";
      const response = await askGemini(question, versionId);

      setAiResponse(response);
      setMediaPlanContent(response); // ➕ On garde la réponse pour l’update
    } catch (error) {
      console.error("Error generating AI response:", error);
      setAiResponse("An error occurred while generating the response.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async () => {
      try {
        if (!versionId) throw new Error("versionId not found");
    
        await VersionRepository.updateMediaPlan(versionId, mediaPlanContent);
        setHasAccepted(true);
        navigation.goToEvents();
      } catch (error) {
        console.error("Failed to update media plan:", error);
        alert("An error occurred while saving the media plan.");
      }
    };
    

  return (
    <div className="ai-response-box">
      <h4>AI Response</h4>
      <div className="chatbot-response">
        <p id="ai-response">{aiResponse}</p>
      </div>
      {!hasAccepted && (
        <div className="action-buttons">
          <button onClick={fetchResponse} disabled={isLoading}>
            {isLoading ? "Regenerating..." : "Regenerate"}
          </button>
          <button onClick={handleAccept}>Accept</button>
        </div>
      )}
      {hasAccepted && <p className="accepted-message">Response accepted ✅</p>}
    </div>
  );
};

export default PlanMedia;
