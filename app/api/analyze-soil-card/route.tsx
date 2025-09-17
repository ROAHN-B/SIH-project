// src/app/api/analyze-soil-card/route.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// CHANGE 4: Add a check for the API key to fail fast
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function fileToGenerativePart(buffer: Buffer, mimeType: string) {
  return { inlineData: { data: buffer.toString("base64"), mimeType } };
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const fileValue = data.get("file");

    // CHANGE 3: Improved file validation and type safety
    if (!fileValue || !(fileValue instanceof File)) {
      return NextResponse.json({ error: "No file uploaded or invalid file type." }, { status: 400 });
    }
    const file: File = fileValue;

    const buffer = Buffer.from(await file.arrayBuffer());
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    // CHANGE 1: Added "Calcium (Ca)" and "Magnesium (Mg)" to the prompt
    const prompt = `
      As an expert agricultural analyst, examine this image of a Soil Health Card.
      Extract all available values precisely: pH, EC, Organic Carbon (OC), Nitrogen (N), Phosphorus (P), Potassium (K), Sulphur (S), Calcium (Ca), Magnesium (Mg), Zinc (Zn), Boron (B), Iron (Fe), Manganese (Mn), and Copper (Cu).
      The units for N, P, K are typically kg/ha. The units for S, Zn, B, Fe, Mn, Cu are typically ppm. OC, Ca, Mg are typically in percent (%). EC is in dS/m or mS/cm.
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
        "ca": <number>,
        "mg": <number>,
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
    
    // CHANGE 2: Make JSON parsing robust by cleaning the string first
    let responseText = result.response.text();
    
    // Remove markdown backticks and the "json" language identifier
    const cleanedJsonString = responseText.replace(/^```json\s*/, '').replace(/```$/, '');

    const parsedJson = JSON.parse(cleanedJsonString);

    return NextResponse.json(parsedJson);

  } catch (error: any) {
    console.error("Error in Gemini API route:", error);
    // Provide more specific error logging if available
    if (error.response) {
      console.error("Error response data:", error.response.data);
    }
    return NextResponse.json(
      { error: "Failed to analyze image on the server." },
      { status: 500 }
    );
  }
}