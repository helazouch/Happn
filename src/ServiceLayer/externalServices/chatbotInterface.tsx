// // src/components/ChatbotInterface.tsx
// import React, { useState } from 'react';
// import { askGemini } from './AIService';

// const ChatbotInterface: React.FC = () => {
//   const [userInput, setUserInput] = useState<string>('');
//   const [response, setResponse] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (!userInput) return;

//     setLoading(true);
//     setError('');
//     try {
//       const aiResponse = await askGemini(userInput);
//       setResponse(aiResponse);
//     } catch (err) {
//       setError('Erreur lors de la récupération de la réponse.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="chatbot-container">
//       <h2>Chat avec le Chatbot</h2>
//       <form onSubmit={handleSubmit}>
//         <textarea
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           placeholder="Posez une question..."
//           rows={4}
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? 'Chargement...' : 'Envoyer'}
//         </button>
//       </form>
//       {error && <p className="error-message">{error}</p>}
//       {response && <div className="chatbot-response">{response}</div>}
//     </div>
//   );
// };

// export default ChatbotInterface;
