// src/app/api/analyze-soil-card/route.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

function fileToGenerativePart(buffer: Buffer, mimeType: string) {
  return { inlineData: { data: buffer.toString("base64"), mimeType } };
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

    // The prompt is now updated to extract all primary, secondary, and micronutrients.
    const prompt = `
      As an expert agricultural analyst, examine this image of a Soil Health Card.
      Extract all available values precisely: pH, EC, Organic Carbon (OC), Nitrogen (N), Phosphorus (P), Potassium (K), Sulphur (S), Zinc (Zn), Boron (B), Iron (Fe), Manganese (Mn), and Copper (Cu).
      If a value is not present, set it to 0.
      Respond ONLY with a valid JSON object in the following format. Do not include any other text, explanations, or markdown formatting.
      
      {
        "ph": <number>,
        "ec": <number>,
        "oc": <number>,
        "n": <number>,
        "p": <number>,
        "k": <number>,
        "s": <number>,
        "zn": <number>,
        "b": <number>,
        "fe": <number>,
        "mn": <number>,
        "cu": <number>
      }
    `;

    const imagePart = fileToGenerativePart(buffer, file.type);
    const result = await model.generateContent({
        contents: [{ role: "user", parts: [imagePart, {text: prompt}] }],
        generationConfig: { responseMimeType: "application/json" },
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