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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  MapPin,
  Clock,
  RefreshCw,
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

const markets = [
  { value: "pune", label: "Pune, Maharashtra" },
  { value: "mumbai", label: "Mumbai, Maharashtra" },
  { value: "delhi", label: "Delhi" },
  { value: "bangalore", label: "Bangalore, Karnataka" },
  { value: "hyderabad", label: "Hyderabad, Telangana" },
];

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
  const [selectedMarket, setSelectedMarket] = useState("pune");

  /* ---------- LOCATION DETECTION & INITIALIZATION ---------- */
  useEffect(() => {
    const getInitialCity = () => {
      // Priority 1: Use the city from the URL if it exists
      if (cityFromUrl) {
        setCity(cityFromUrl);
        setCityInput(cityFromUrl);
        const market = markets.find((m) =>
          m.label.toLowerCase().includes(cityFromUrl.toLowerCase())
        );
        if (market) setSelectedMarket(market.value);
        return;
      }

      // Priority 2: Try to get user's geolocation
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              const { data } = await axios.get(
                "https://api.openweathermap.org/data/2.5/weather",
                {
                  params: {
                    lat: latitude,
                    lon: longitude,
                    units: "metric",
                    appid: process.env.NEXT_PUBLIC_WEATHER_KEY!,
                  },
                }
              );
              const detectedCity = data.name;
              setCity(detectedCity);
              setCityInput(detectedCity);
              const market = markets.find((m) =>
                m.label.toLowerCase().includes(detectedCity.toLowerCase())
              );
              if (market) setSelectedMarket(market.value);
            } catch (err) {
              console.error("Error fetching city from coordinates:", err);
              // Fallback to a default city on API error
              setCity("Pune");
              setCityInput("Pune");
              setSelectedMarket("pune");
            }
          },
          (err) => {
            console.error("Geolocation permission denied or failed:", err);
            // Fallback to a default city if user denies permission
            setCity("Pune");
            setCityInput("Pune");
            setSelectedMarket("pune");
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        // Fallback if the browser does not support geolocation
        setCity("Pune");
        setCityInput("Pune");
        setSelectedMarket("pune");
      }
    };

    getInitialCity();
  }, [cityFromUrl]);

  /* ---------- WEATHER + FORECAST FETCH ---------- */
  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: `${cityName.trim()},IN`,
            units: "metric",
            appid: process.env.NEXT_PUBLIC_WEATHER_KEY!,
          } satisfies Record<string, string>,
        }
      );
      setWeather({
        temp: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windSpeed: data.wind?.speed ?? 0,
        visibility: Number(
          data.visibility ? (data.visibility / 1000).toFixed(1) : 0
        ),
        condition: data.weather[0].main,
      });
    } catch (e: any) {
      setError("Weather data unavailable");
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async (cityName: string) => {
    try {
      const { data } = await axios.get(
        "https://api.openweathermap.org/data/2.5/forecast",
        {
          params: {
            q: `${cityName.trim()},IN`,
            units: "metric",
            appid: process.env.NEXT_PUBLIC_WEATHER_KEY!,
          } satisfies Record<string, string>,
        }
      );

      // group by local date
      const groups: Record<
        string,
        { temps: number[]; conditions: string[]; rain: number[] }
      > = {};
      data.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000).toLocaleDateString("en-CA");
        if (!groups[date])
          groups[date] = { temps: [], conditions: [], rain: [] };
        groups[date].temps.push(item.main.temp);
        groups[date].conditions.push(item.weather[0].main);
        groups[date].rain.push(item.pop ?? 0);
      });

      // build 7 rows (today + next 6)
      const days = Object.keys(groups)
        .slice(0, 7)
        .map((dateStr, idx) => {
          const temps = groups[dateStr].temps;
          const conditions = groups[dateStr].conditions;
          const rainProbs = groups[dateStr].rain;
          const high = Math.round(Math.max(...temps));
          const low = Math.round(Math.min(...temps));
          const mostCommonCond = conditions
            .sort(
              (a, b) =>
                conditions.filter((v) => v === a).length -
                conditions.filter((v) => v === b).length
            )
            .pop()!;
          const avgRain = Math.round(
            (rainProbs.reduce((a, b) => a + b, 0) / rainProbs.length) * 100
          );
          const dayLabel =
            idx === 0
              ? t.today
              : new Date(dateStr).toLocaleDateString(undefined, {
                  weekday: "long",
                });

          const iconMap: Record<string, JSX.Element> = {
            Clear: <Sun className="h-6 w-6" />,
            Clouds: <Cloud className="h-6 w-6" />,
            Rain: <CloudRain className="h-6 w-6" />,
          };
          return {
            day: dayLabel,
            high,
            low,
            condition: mostCommonCond,
            icon: iconMap[mostCommonCond] ?? <Cloud className="h-6 w-6" />,
            rain: avgRain,
          };
        });

      setDailyForecast(days);
    } catch {
      // fallback mock
      setDailyForecast([
        {
          day: t.today,
          high: 30,
          low: 22,
          condition: t.partlyCloudy,
          icon: <Cloud className="h-6 w-6" />,
          rain: 20,
        },
        {
          day: t.tomorrow,
          high: 32,
          low: 24,
          condition: t.sunny,
          icon: <Sun className="h-6 w-6" />,
          rain: 5,
        },
        {
          day: t.wednesday,
          high: 29,
          low: 21,
          condition: t.rainy,
          icon: <CloudRain className="h-6 w-6" />,
          rain: 80,
        },
        {
          day: t.thursday,
          high: 27,
          low: 20,
          condition: t.cloudy,
          icon: <Cloud className="h-6 w-6" />,
          rain: 40,
        },
        {
          day: t.friday,
          high: 31,
          low: 23,
          condition: t.sunny,
          icon: <Sun className="h-6 w-6" />,
          rain: 10,
        },
        {
          day: t.saturday,
          high: 33,
          low: 25,
          condition: t.sunny,
          icon: <Sun className="h-6 w-6" />,
          rain: 0,
        },
        {
          day: t.sunday,
          high: 28,
          low: 22,
          condition: t.rainy,
          icon: <CloudRain className="h-6 w-6" />,
          rain: 70,
        },
      ]);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeather(city);
      fetchForecast(city);
    }
  }, [city, language]);

  /* ---------- MOCK MARKET DATA ---------- */
  const marketPrices = [
    {
      crop: "Tomato",
      currentPrice: 25,
      previousPrice: 30,
      change: -16.7,
      wholesale: 22,
      retail: 28,
      trend: "down",
    },
    {
      crop: "Onion",
      currentPrice: 35,
      previousPrice: 28,
      change: 25,
      wholesale: 32,
      retail: 38,
      trend: "up",
    },
    {
      crop: "Potato",
      currentPrice: 18,
      previousPrice: 18,
      change: 0,
      wholesale: 16,
      retail: 20,
      trend: "stable",
    },
    {
      crop: "Wheat",
      currentPrice: 22,
      previousPrice: 21,
      change: 4.8,
      wholesale: 20,
      retail: 24,
      trend: "up",
    },
    {
      crop: "Rice",
      currentPrice: 45,
      previousPrice: 47,
      change: -4.3,
      wholesale: 42,
      retail: 48,
      trend: "down",
    },
    {
      crop: "Cotton",
      currentPrice: 85,
      previousPrice: 82,
      change: 3.7,
      wholesale: 82,
      retail: 88,
      trend: "up",
    },
  ];

  const alerts = [
    {
      type: "weather",
      severity: "warning",
      title: t.weatherWarning,
      message: t.heavyRainAlert,
      icon: <CloudRain className="h-5 w-5 text-blue-600" />,
    },
    {
      type: "price",
      severity: "info",
      title: t.priceAlert,
      message: t.priceRiseAlert,
      icon: <TrendingUp className="h-5 w-5 text-green-600" />,
    },
  ];

  /* ---------- HELPERS ---------- */
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <div className="h-4 w-4" />;
    }
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-gray-600";
  };

  /* ---------- RENDER ---------- */
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t.backToHome}
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Cloud className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-gray-900">
                {t.weatherMarketInfo}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {alerts.length > 0 && (
          <div className="mb-8 space-y-4">
            {alerts.map((alert, index) => (
              <Card
                key={index}
                className="border-l-4 border-l-orange-500 bg-orange-50"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-orange-900">
                        {alert.title}
                      </p>
                      <p className="text-sm text-orange-700 mt-1">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* ------- WEATHER ------- */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                {t.currentWeather}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchWeather(city)}
                disabled={loading}
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
                />
                {t.lastUpdated}
              </Button>
            </div>

            {/* ----- City Input ----- */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="City name"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && setCity(cityInput)}
                  />
                  <Button onClick={() => setCity(cityInput)}>Update</Button>
                </div>
              </CardContent>
            </Card>

            {error && (
              <Card className="border-l-4 border-l-red-500 bg-red-50">
                <CardContent className="pt-6">
                  <p className="text-sm text-red-700">{error}</p>
                </CardContent>
              </Card>
            )}

            {weather && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-3xl font-bold">
                        {weather.temp}°C
                      </CardTitle>
                      <CardDescription className="text-lg">
                        {weather.condition}
                      </CardDescription>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {city}, India
                      </p>
                    </div>
                    <div className="text-right">
                      <Sun className="h-8 w-8 text-yellow-500" />
                      <p className="text-sm text-gray-500 mt-2">
                        {t.feelsLike} {weather.feelsLike}°C
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">{t.humidity}</p>
                        <p className="font-semibold">{weather.humidity}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">{t.windSpeed}</p>
                        <p className="font-semibold">{weather.windSpeed} km/h</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-purple-500" />
                      <div>
                        <p className="text-sm text-gray-500">{t.pressure}</p>
                        <p className="font-semibold">{weather.pressure} hPa</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-sm text-gray-500">{t.visibility}</p>
                        <p className="font-semibold">{weather.visibility} km</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* ------- 7-Day Real Forecast ------- */}
            <Card>
              <CardHeader>
                <CardTitle>{t.weatherForecast}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dailyForecast.map((day, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b last:border-b-0"
                    >
                      <div className="flex items-center gap-3">
                        {day.icon}
                        <div>
                          <p className="font-medium">{day.day}</p>
                          <p className="text-sm text-gray-500">
                            {day.condition}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {day.high}° / {day.low}°
                        </p>
                        <p className="text-sm text-blue-600">
                          {day.rain}% {t.rainfall}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ------- MARKET SECTION ------- */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                {t.marketPrices}
              </h2>
              <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder={t.selectMarket} />
                </SelectTrigger>
                <SelectContent>
                  {markets.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t.todaysPrices}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {t.lastUpdated}: 2 hours ago
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketPrices.map((item) => (
                    <div
                      key={item.crop}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Sprout className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{item.crop}</p>
                          <p className="text-sm text-gray-500">
                            {t.wholesale}: ₹{item.wholesale} | {t.retail}: ₹
                            {item.retail}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-lg">
                            ₹{item.currentPrice}
                          </p>
                          {getTrendIcon(item.trend)}
                        </div>
                        <p className={`text-sm ${getTrendColor(item.change)}`}>
                          {item.change > 0 ? "+" : ""}
                          {item.change.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.marketTrends}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Rising Prices</span>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      3 crops
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Falling Prices</span>
                    <Badge
                      variant="secondary"
                      className="bg-red-100 text-red-800"
                    >
                      2 crops
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Stable Prices</span>
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-800"
                    >
                      1 crop
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.nearbyMarkets}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>Pune Agricultural Market</span>
                    </div>
                    <span className="text-sm text-gray-500">2.5 km</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>Hadapsar Mandi</span>
                    </div>
                    <span className="text-sm text-gray-500">5.2 km</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>Kothrud Market</span>
                    </div>
                    <span className="text-sm text-gray-500">8.1 km</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
