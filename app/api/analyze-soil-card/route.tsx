// src/app/api/analyze-soil-card/route.ts

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

function fileToGenerativePart(buffer: Buffer, mimeType: string) {
  return {
    inlineData: {
      data: buffer.toString("base64"),
      mimeType,
    },
  };
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const prompt = `
        As an expert agricultural analyst, examine this image of a Soil Health Card.
        Extract the values for Nitrogen (N), Phosphorus (P), Potassium (K), pH, and Organic Carbon (OC).
        Classify each nutrient's level (e.g., "Low", "Medium", "High").
        Provide a concise summary and two actionable recommendations.
        Respond ONLY with a valid JSON object in the specified format. Do not include markdown.
        {
          "nitrogen": { "value": <number>, "level": "Low" | "Medium" | "High", "ideal": "280-560 kg/ha" },
          "phosphorus": { "value": <number>, "level": "Low" | "Medium" | "High", "ideal": "25-50 kg/ha" },
          "potassium": { "value": <number>, "level": "Low" | "Medium" | "High", "ideal": "150-300 kg/ha" },
          "ph": { "value": <number>, "level": "Acidic" | "Neutral" | "Alkaline", "ideal": "6.5-7.5" },
          "organicCarbon": { "value": <number>, "level": "Low" | "Medium" | "High", "ideal": "0.5-0.75 %" },
          "summary": "<string>",
          "recommendations": ["<string>", "<string>"]
        }
    `;

    // ✅ ADDED SAFETY SETTINGS
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ];

    const imagePart = fileToGenerativePart(buffer, file.type);
    
    // ✅ UPDATED API CALL WITH NEW SETTINGS
    const result = await model.generateContent({
        contents: [{ role: "user", parts: [imagePart, {text: prompt}] }],
        safetySettings,
        generationConfig: {
            responseMimeType: "application/json",
        },
    });
    
    return NextResponse.json(JSON.parse(result.response.text()));

  } catch (error: any) {
    console.error("Error in Gemini API route:", error);
    return NextResponse.json(
      { error: "Failed to analyze image on the server." },
      { status: 500 }
    );
  }
}