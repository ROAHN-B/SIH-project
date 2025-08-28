import { GoogleGenerativeAI } from "@google/generative-ai";

// API key here (store in .env ideally)
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY!);

export async function askGemini(prompt: string): Promise<string> {
  const response = await fetch("http://localhost:5001/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  const data = await response.json();
  return data.text;
}



