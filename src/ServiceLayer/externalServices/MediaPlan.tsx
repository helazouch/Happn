// import React, { useState } from "react";
// import { AIService } from "./AIService";

// const MediaPlan: React.FC = () => {
//   const [context, setContext] = useState("");
//   const [plan, setPlan] = useState("");

//   const handleGeneratePlan = async () => {
//     if (context.trim() !== "") {
//       const generatedPlan = await AIService.generateMediaPlan(context);
//       setPlan(generatedPlan);
//     }
//   };

//   return (
//     <div className="media-plan-container">
//       <h2>Génération de Plan Médiatique</h2>
//       <textarea
//         value={context}
//         onChange={(e) => setContext(e.target.value)}
//         placeholder="Décris ton projet..."
//       />
//       <button onClick={handleGeneratePlan}>Générer</button>
//       <div className="generated-plan">{plan}</div>
//     </div>
//   );
// };

// export default MediaPlan;
