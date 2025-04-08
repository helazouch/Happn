// import React, { useState } from "react";
// import { AIService } from "./AIService";

// const Chatbot: React.FC = () => {
//   const [message, setMessage] = useState("");
//   const [response, setResponse] = useState("");

//   const handleSendMessage = async () => {
//     if (message.trim() !== "") {
//       const aiResponse = await AIService.askAI(message);
//       setResponse(aiResponse);
//     }
//   };

//   return (
//     <div className="chatbot-container">
//       <h2>Assistant IA</h2>
//       <textarea
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Posez une question..."
//       />
//       <button onClick={handleSendMessage}>Envoyer</button>
//       <div className="chat-response">{response}</div>
//     </div>
//   );
// };

// export default Chatbot;
