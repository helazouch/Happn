// import { GoogleGenerativeAI } from "@google/generative-ai";

// const API_KEY = "AIzaSyAz01B8P3ky4K-R_6UUIaoHc9xGKRPJFVU"; // Remplace par ta vraie clé
// const genAi = new GoogleGenerativeAI(API_KEY);

// async function run() {
//     try {
//         const model = genAi.getGenerativeModel({ model: "gemini-pro-latest" }); // Utilise "gemini-pro-latest"
//         const prompt = "write hello world";
        
//         const result = await model.generateContent({ contents: [{ parts: [{ text: prompt }] }] });
//         const response = result.response;
//         const text = response.candidates[0].content.parts[0].text;

//         console.log(text);
//     } catch (error) {
//         console.error("Erreur:", error);
//     }
// }

// run();



// import { GoogleGenerativeAI } from "@google/generative-ai";

// const API_KEY = "AIzaSyAz01B8P3ky4K-R_6UUIaoHc9xGKRPJFVU"; // Remplace par ta clé API
// const genAi = new GoogleGenerativeAI(API_KEY);

// async function listModels() {
//     const models = await genAi.listModels();
//     console.log(models);
// }

// listModels();


import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyAz01B8P3ky4K-R_6UUIaoHc9xGKRPJFVU"; // Remplace par ta clé API
const genAi = new GoogleGenerativeAI(API_KEY);

async function run() {
    try {
        const model = genAi.getGenerativeModel({ model: "gemini-2.0-flash" });
        
        const prompt = "write hello word";
        const result = await model.generateContent({
            contents: [{ parts: [{ text: prompt }] }]
        });

        const response = result.response;
        const text = response.candidates[0].content.parts[0].text;

        console.log(text);
    } catch (error) {
        console.error("Error:", error);
    }
}

run();
