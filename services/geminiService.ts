import { GoogleGenAI, Type } from "@google/genai";
import { Scene } from "../types"; 
import { MOCK_SCENES } from "../constants";

// Initialize safely
const apiKey = process.env.API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const analyzeContent = async (content: string, genre: string = "auto-detect"): Promise<Scene[]> => {
  if (!ai) {
    console.warn("No API Key found, using mock data.");
    return new Promise(resolve => setTimeout(() => resolve(MOCK_SCENES), 1500));
  }

  try {
    const prompt = `
      You are a universal content analyzer for BooksToReel.
      INPUT TYPE: text
      CONTENT: ${content.substring(0, 5000)}
      GENRE HINT: ${genre}

      TASK:
      1. Identify the genre
      2. Extract convertible scenes
      3. For each scene, provide details.

      Return ONLY JSON.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            scenes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  type: { type: Type.STRING },
                  duration: { type: Type.NUMBER },
                },
                required: ["id", "title", "description", "type", "duration"]
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    const data = JSON.parse(text);
    return data.scenes || MOCK_SCENES;
    
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return MOCK_SCENES;
  }
};

export const generateCaption = async (sceneDescription: string): Promise<{caption: string, hashtags: string[]}> => {
  if (!ai) {
     return { 
       caption: "When she finally said the words he waited 3 years for 💔", 
       hashtags: ["#BooksToReel", "#KDrama", "#BookTok", "#Romance"] 
     };
  }

  try {
     const response = await ai.models.generateContent({
       model: 'gemini-2.5-flash',
       contents: `Generate a viral TikTok caption and hashtags for a video scene described as: ${sceneDescription}. Return JSON.`,
       config: {
         responseMimeType: "application/json",
         responseSchema: {
           type: Type.OBJECT,
           properties: {
             caption: { type: Type.STRING },
             hashtags: { type: Type.ARRAY, items: { type: Type.STRING } }
           }
         }
       }
     });

     const text = response.text;
     if (!text) throw new Error("No response");
     return JSON.parse(text);
  } catch(e) {
     return { 
       caption: "When she finally said the words he waited 3 years for 💔", 
       hashtags: ["#BooksToReel", "#KDrama", "#BookTok", "#Romance"] 
     };
  }
}