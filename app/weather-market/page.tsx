import { Suspense } from 'react';
import WeatherMarketClient from '@/app/weather-market/WeatherMarketClient';

// A simple, centered loading component for the fallback UI
function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-xl font-semibold">
         🌀 Detecting location and loading weather data...
      </div>
    </div>
  );
}

export default function WeatherMarketPage() {
  return (
    <Suspense fallback={<Loading />}>
      <WeatherMarketClient />
    </Suspense>
  );
}
