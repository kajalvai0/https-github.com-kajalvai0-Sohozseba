
import { GoogleGenAI } from "@google/genai";

export const getGeminiResponse = async (prompt: string, history: { role: 'user' | 'model'; parts: { text: string }[] }[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `You are "Sohozseba Local Assistant", an expert coordinator for skilled manual services in Naogaon, Bangladesh. 
        Your goal is to help users find Electricians, Plumbers, Mechanics, Painters, Tailors, and Barbers.
        
        Guidelines:
        - Be friendly and professional. Speak like a helpful neighbor.
        - You know about local areas like Sarisahatir Mor, Naogaon Sadar, Hossenpur, etc.
        - If someone asks for a worker, suggest categories and tell them about the "Sarisahatir Mor" based services.
        - Always support both English and Bengali (Bangla).
        - Provide concise, practical advice (e.g., "Always check the motor capacity before calling an electrician").
        - Use Google Search for current market rates for these services in Bangladesh if asked.`,
        tools: [{ googleSearch: {} }],
        temperature: 0.7,
      },
    });

    const text = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const urls = groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || 'Market Rate Source',
      uri: chunk.web?.uri
    })).filter((u: any) => u.uri);

    return { text, urls };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "দুঃখিত, আমি এই মুহূর্তে তথ্য দিতে পারছি না।", urls: [] };
  }
};
