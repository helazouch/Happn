import axios from "axios";

const API_KEY = "AIzaSyCmI5z9RdjbZGUTBvgWi2IVnOZyHczUqqE"; // Remplace par ta clé API
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=${API_KEY}`;

export const AIService = {
  async askAI(question: string): Promise<string> {
    try {
      const response = await axios.post(
        API_URL,
        {
          prompt: { text: question },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Accéder à la réponse de Gemini
      return response.data.candidates?.[0]?.content || "Aucune réponse trouvée.";
    } catch (error) {
      console.error("Erreur avec Google Gemini:", error);
      return "Désolé, je ne peux pas répondre pour le moment.";
    }
  },

  async generateMediaPlan(context: string): Promise<string> {
    try {
      const response = await axios.post(
        API_URL,
        {
          prompt: { text: `Génère un plan médiatique pour : ${context}` },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.candidates?.[0]?.content || "Impossible de générer le plan pour le moment.";
    } catch (error) {
      console.error("Erreur avec Google Gemini:", error);
      return "Erreur lors de la génération du plan.";
    }
  },
};
