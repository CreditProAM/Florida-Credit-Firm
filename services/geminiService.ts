import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// Note: In a real production app, ensure this is handled securely.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeCreditIssue = async (issueDescription: string): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview'; 
    const prompt = `
      You are a senior credit consultant at "Florida Credit Firm", a high-end credit repair agency.
      
      User Issue: "${issueDescription}"
      
      Provide a strategic, professional response in 3 paragraphs:
      1. Identify the likely violation or issue based on FCRA/FDCPA laws.
      2. Suggest a specific dispute strategy (e.g., Factual Dispute, Validation Debt Letter).
      3. Explain how our firm would handle this to remove the item.
      
      Tone: Authoritative, empathetic, professional, and confident. 
      Format: specific and actionable. Do not give generic advice.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "I apologize, but I couldn't generate a specific strategy at this moment. Please contact our team directly.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our AI analysis systems are currently high-volume. Please try again or book a consultation.";
  }
};