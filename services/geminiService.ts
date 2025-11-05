
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `You are an expert manufacturing plant analyst AI. 
Analyze the following real-time plant data, which is provided in a JSON object. 
Answer the user's question with concise, data-driven insights. 
When referencing specific data points, be explicit (e.g., "Line 3's efficiency is at 75%").
Provide actionable recommendations where possible.`;

export const getAiInsight = async (plantData: object, userQuery: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-pro'; 
    const prompt = `
      Current Plant Data:
      ${JSON.stringify(plantData, null, 2)}

      User Question: ${userQuery}
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error getting AI insight:", error);
    return "Sorry, I encountered an error trying to analyze the data. Please check the console for more details.";
  }
};
