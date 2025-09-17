"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sprout,
  ArrowLeft,
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Eye,
  Gauge,
  Droplets,
  AlertTriangle,
  MapPin,
  Clock,
  RefreshCw,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { useTranslation } from "@/lib/translations";
import axios from "axios";

/* ---------- TYPES ---------- */
type Weather = {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  condition: string;
};

type ForecastDay = {
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: JSX.Element;
  rain: number;
};

type Alert = {
  type: "weather" | "price";
  title: string;
  message: string;
};

type MarketPrice = {
  crop: string;
  currentPrice: number;
  wholesale: number;
  retail: number;
};

type NearbyMarket = {
  name: string;
  address: string;
};

/* ---------- COMPONENT ---------- */
export default function WeatherMarketPage() {
  const searchParams = useSearchParams();
  const cityFromUrl = searchParams.get("city")?.trim();

  const { language } = useLanguage();
  const t = useTranslation(language);

  /* ---------- STATE ---------- */
  const [cityInput, setCityInput] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [dailyForecast, setDailyForecast] = useState<ForecastDay[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  
  const [marketData, setMarketData] = useState<MarketPrice[]>([]);
  const [marketLoading, setMarketLoading] = useState<boolean>(true);
  const [marketError, setMarketError] = useState<string>("");
  
  const [nearbyMarkets, setNearbyMarkets] = useState<NearbyMarket[]>([]);
  const [nearbyMarketsLoading, setNearbyMarketsLoading] = useState<boolean>(true);

  // 🔄 UPDATED: This function now calls your own reliable mock API
  const fetchMarketData = async (cityName: string) => {
    setMarketLoading(true);
    setMarketError("");

    try {
        const response = await axios.get("/api/market-prices", {
            // Send the city as a query parameter
            params: {
                city: cityName,
            },
            // Send your secret API key in the headers
            headers: {
                "x-api-key": "9881454682abcd",
            },
        });

        if (response.data.length === 0) {
            setMarketError(`No market data available for ${cityName}.`);
        }

        setMarketData(response.data);

    } catch (err: any) {
        console.error("Error fetching market data:", err);
        if (err.response?.status === 401) {
            setMarketError("Error: Invalid API Key provided.");
        } else {
            setMarketError("Failed to load market prices from the server.");
        }
        setMarketData([]);
    } finally {
        setMarketLoading(false);
    }
  };

  const fetchNearbyMarkets = async (cityName: string) => {
      setNearbyMarketsLoading(true);
      const simulatedData: Record<string, NearbyMarket[]> = {
          "Solapur": [
              { name: "Solapur Krushi Utpanna Baazar", address: "Hydrabad road solapur" },
          ],
          "Amritsar": [
              { name: "Vallaha Mandi", address: "Amritsar, Punjab" },
              { name: "Central Vegetable Market", address: "Hall Gate, Amritsar" },
          ],
          "default": [
              { name: "Local City Mandi", address: `${cityName}` },
          ]
      };
      setTimeout(() => {
          setNearbyMarkets(simulatedData[cityName] || simulatedData["default"]);
          setNearbyMarketsLoading(false);
      }, 500);
  };
  
  useEffect(() => {
    const getInitialCity = () => {
      if (cityFromUrl) { setCity(cityFromUrl); setCityInput(cityFromUrl); return; }
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              const { data } = await axios.get(
                "https://api.openweathermap.org/data/2.5/weather",
                { params: { lat: latitude, lon: longitude, units: "metric", appid: process.env.NEXT_PUBLIC_WEATHER_KEY! } }
              );
              setCity(data.name); setCityInput(data.name);
            } catch (err) { setCity("Solapur"); setCityInput("Solapur"); } // Fallback to a city in our dummy data
          },
          (err) => { console.error("Geolocation permission denied:", err); setCity("Solapur"); setCityInput("Solapur"); }
        );
      } else { setCity("Solapur"); setCityInput("Solapur"); }
    };
    getInitialCity();
  }, [cityFromUrl]);

  const fetchWeather = async (cityName: string) => {
    setLoading(true); setError("");
    try {
      const { data } = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: { q: `${cityName.trim()},IN`, units: "metric", appid: process.env.NEXT_PUBLIC_WEATHER_KEY! }
      });
      setWeather({
        temp: Math.round(data.main.temp), feelsLike: Math.round(data.main.feels_like), humidity: data.main.humidity,
        pressure: data.main.pressure, windSpeed: data.wind?.speed ?? 0,
        visibility: Number((data.visibility ? data.visibility / 1000 : 0).toFixed(1)), condition: data.weather[0].main,
      });
    } catch (e) { setError("Weather data unavailable"); setWeather(null);
    } finally { setLoading(false); }
  };

  const fetchForecast = async (cityName: string) => {
     try {
      const { data } = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
        params: { q: `${cityName.trim()},IN`, units: "metric", appid: process.env.NEXT_PUBLIC_WEATHER_KEY! }
      });
      const groups: Record<string, { temps: number[]; conditions: string[]; rain: number[] }> = {};
      data.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000).toLocaleDateString("en-CA");
        if (!groups[date]) groups[date] = { temps: [], conditions: [], rain: [] };
        groups[date].temps.push(item.main.temp);
        groups[date].conditions.push(item.weather[0].main);
        groups[date].rain.push(item.pop ?? 0);
      });
      const days = Object.keys(groups).slice(0, 7).map((dateStr, idx) => {
        const { temps, conditions, rain } = groups[dateStr];
        const high = Math.round(Math.max(...temps));
        const low = Math.round(Math.min(...temps));
        const mostCommonCond = conditions.sort((a, b) => conditions.filter(v => v === a).length - conditions.filter(v => v === b).length).pop()!;
        const avgRain = Math.round((rain.reduce((a, b) => a + b, 0) / rain.length) * 100);
        const dayLabel = idx === 0 ? t.today : new Date(dateStr).toLocaleDateString(undefined, { weekday: "long" });
        const iconMap: Record<string, JSX.Element> = { Clear: <Sun />, Clouds: <Cloud />, Rain: <CloudRain /> };
        return { day: dayLabel, high, low, condition: mostCommonCond, icon: iconMap[mostCommonCond] ?? <Cloud />, rain: avgRain };
      });
      setDailyForecast(days);
    } catch (err) { console.error("Error fetching forecast:", err); }
  };
  
  useEffect(() => {
    if (city) {
      fetchWeather(city);
      fetchForecast(city);
      fetchMarketData(city);
      fetchNearbyMarkets(city);
    }
  }, [city]);

  useEffect(() => {
    if (weather && weather.humidity > 85) {
      setAlerts([{ type: "weather", title: t.weatherWarning, message: `High humidity (${weather.humidity}%) may increase risk of fungal diseases.` }]);
    } else { setAlerts([]); }
  }, [weather, t]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-2" />{t.backToHome}</Button></Link>
          <div className="flex items-center gap-2"><Cloud className="h-6 w-6 text-primary" /><h1 className="text-xl font-bold">{t.weatherMarketInfo}</h1></div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {alerts.length > 0 && <div className="mb-8 space-y-4">{alerts.map((alert, index) => <Card key={index} className="border-l-4 border-l-orange-500 bg-orange-50"><CardContent className="pt-6 flex items-start gap-3"><AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" /><div><p className="font-medium text-orange-900">{alert.title}</p><p className="text-sm text-orange-700 mt-1">{alert.message}</p></div></CardContent></Card>)}</div>}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">{t.currentWeather}</h2>
              <Button variant="outline" size="sm" onClick={() => city && fetchWeather(city)} disabled={loading || !city}><RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />{t.refresh}</Button>
            </div>
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-2">
                  <Input placeholder="Enter city name..." value={cityInput} onChange={(e) => setCityInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && setCity(cityInput)} />
                  <Button onClick={() => setCity(cityInput)}>Update</Button>
                </div>
              </CardContent>
            </Card>
            {error && <Card className="border-l-4 border-l-red-500 bg-red-50"><CardContent className="pt-6"><p className="text-sm text-red-700">{error}</p></CardContent></Card>}
            {weather && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-3xl font-bold">{weather.temp}°C</CardTitle>
                      <CardDescription className="text-lg">{weather.condition}</CardDescription>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" />{city}, India</p>
                    </div>
                    <div className="text-right">
                      <Sun className="h-8 w-8 text-yellow-500" />
                      <p className="text-sm text-gray-500 mt-2">{t.feelsLike} {weather.feelsLike}°C</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2"><Droplets className="h-4 w-4 text-blue-500" /><div><p className="text-sm text-gray-500">{t.humidity}</p><p className="font-semibold">{weather.humidity}%</p></div></div>
                    <div className="flex items-center gap-2"><Wind className="h-4 w-4 text-gray-500" /><div><p className="text-sm text-gray-500">{t.windSpeed}</p><p className="font-semibold">{weather.windSpeed} km/h</p></div></div>
                    <div className="flex items-center gap-2"><Gauge className="h-4 w-4 text-purple-500" /><div><p className="text-sm text-gray-500">{t.pressure}</p><p className="font-semibold">{weather.pressure} hPa</p></div></div>
                    <div className="flex items-center gap-2"><Eye className="h-4 w-4 text-green-500" /><div><p className="text-sm text-gray-500">{t.visibility}</p><p className="font-semibold">{weather.visibility} km</p></div></div>
                  </div>
                </CardContent>
              </Card>
            )}
            <Card>
              <CardHeader><CardTitle>{t.weatherForecast}</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dailyForecast.length > 0 ? dailyForecast.map((day, index) => <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0"><div className="flex items-center gap-3">{day.icon}<div><p className="font-medium">{day.day}</p><p className="text-sm text-gray-500">{day.condition}</p></div></div><div className="text-right"><p className="font-semibold">{day.high}° / {day.low}°</p><p className="text-sm text-blue-600">{day.rain}% {t.rainfall}</p></div></div>) : <p className="text-sm text-gray-500">Forecast data is unavailable.</p>}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-foreground">{t.marketPrices} {city && `in ${city}`}</h2></div>
            <Card>
              <CardHeader><CardTitle>{t.todaysPrices}</CardTitle></CardHeader>
              <CardContent>
                {marketLoading ? <div className="flex items-center justify-center h-40"><Loader2 className="h-8 w-8 animate-spin text-primary" /><p className="ml-2 text-muted-foreground">Loading Market Data...</p></div> : marketError ? <div className="text-center text-red-600 py-4 h-40 flex items-center justify-center">{marketError}</div> : <div className="space-y-4">{marketData.map((item) => <div key={item.crop} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"><div className="flex items-center gap-3"><Sprout className="h-5 w-5 text-primary" /><div><p className="font-medium">{item.crop}</p><p className="text-sm text-gray-500">Wholesale: ₹{item.wholesale} | Retail: ₹{item.retail}</p></div></div><div className="text-right"><p className="font-bold text-lg">₹{item.currentPrice}</p><p className="text-sm text-gray-500">Avg. Price</p></div></div>)}</div>}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>{t.nearbyMarkets}</CardTitle></CardHeader>
              <CardContent>
                {nearbyMarketsLoading ? <div className="flex items-center justify-center h-24"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div> : <div className="space-y-3">{nearbyMarkets.map((market, index) => <div key={index} className="flex items-start justify-between"><div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-muted-foreground mt-1" /><div><p className="font-medium">{market.name}</p><p className="text-sm text-gray-500">{market.address}</p></div></div></div>)}</div>}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}