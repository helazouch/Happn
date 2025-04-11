// src/ServiceLayer/ai/GeminiService.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getVersionWithEventDetails } from "../../DataLayer/repositories/VersionRepository";

const API_KEY = "AIzaSyAz01B8P3ky4K-R_6UUIaoHc9xGKRPJFVU";
const genAi = new GoogleGenerativeAI(API_KEY);



export async function askGemini1(prompt: string, versionId: string): Promise<string> {
  try {
    // Récupérer les détails de la version et de l'événement
    const details = await getVersionWithEventDetails(versionId);
    
    if (!details) {
      return "Désolé, je n'ai pas pu récupérer les informations de l'événement.";
    }

    const { version, event } = details;
    
    // Formater la date
    const eventDate = version.date instanceof Date ? 
      version.date.toLocaleDateString() : 
      version.date.toDate().toLocaleDateString();

    // Créer un prompt contextuel
    const contextPrompt = `
      Tu es un assistant pour un événement appelé "${event.name}". 
      Voici les détails spécifiques de la version :
      - Nom de la version: ${version.versionName}
      - Date: ${eventDate}
      - Lieu: ${version.place}
      - Prix: ${version.price}€
      - Capacité: ${version.capacity} participants
      - Nombre de participants actuels: ${version.nbparticipants}
      - Description spécifique: ${version.specificDescription}
      - Plan média: ${version.plan_mediatique || 'non spécifié'}
      
      L'événement principal a ces caractéristiques:
      - Organisateur: ${event.organizer}
      - Description générale: ${event.description}
      - Catégories: ${event.categories?.join(', ') || 'non spécifiées'}
      
      le administrateur pose la question suivante: "${prompt}"
      
      Réponds de manière précise par des tirets en tenant compte de ces informations contextuelles et d'une maniere structurée et en 10 lignes au maximum.
      Si la question n'est pas directement liée à l'événement, réponds de manière générale mais essaie de faire le lien quand c'est possible.
    `;

    const model = genAi.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: contextPrompt }],
        },
      ],
    });

    const response = result.response;
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text || "Pas de réponse trouvée.";
    return text;
  } catch (error) {
    console.error("Erreur dans askGemini:", error);
    return "Une erreur s'est produite lors de la génération de la réponse.";
  }
}