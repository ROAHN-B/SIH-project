import { NextResponse } from "next/server";
import { dummyMarketData } from "@/lib/dummydata";

// This is your secret API key. In a real app, you'd store this in your .env file.
const SECRET_API_KEY = "9881454682abcd";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // 1. Check for the API Key in the headers
  const providedApiKey = request.headers.get("x-api-key");
  if (providedApiKey !== SECRET_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Get the city from the query parameters (e.g., /api/market-prices?city=Solapur)
  const city = searchParams.get("city");

  if (!city) {
    return NextResponse.json(
      { error: "City parameter is required" },
      { status: 400 }
    );
  }

  // 3. Filter the dummy data based on the provided city
  const cityData = dummyMarketData.filter(
    (item) => item.city.toLowerCase() === city.toLowerCase()
  );

  // 4. Return the filtered data
  return NextResponse.json(cityData);
}