"use client";
import { useParams } from "next/navigation";
import { useLocation } from "react-router-dom";
import Forecast from "@/components/forecast";
import React, { useState, useEffect } from "react";
import HourlyTemp from "@/components/hourly-temp";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import WeatherInfo from "@/components/weather";
import WeatherComponent from "@/components/weather-component";
import WeatherSkeleton from "@/components/weather-sekeleton";
import useGeolocation from "@/hooks/use-geolocation";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/use-weather";
import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react";

export default function City() {
  const { name } = useParams(); // Capture dynamic city name from URL
  const location = useLocation(); // Capture query params from URL
  const queryParams = new URLSearchParams(location.search);

  // Extract query parameters (lat, lon, country)
  const latitude = queryParams.get("lat");
  const longitude = queryParams.get("lon");
  const country = queryParams.get("country");

  const [isClient, setIsClient] = useState(false); // Add a state variable

  useEffect(() => {
    setIsClient(true); // Set isClient to true after the component mounts
  }, []);

  const coordinates = { latitude, longitude }; // Create coordinates object
  console.log(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  console.log(weatherQuery);
  console.log(locationQuery);
  console.log(forecastQuery);
  if (!isClient) {
    return <div>Loading...</div>; // Or a placeholder for server-side rendering
  }

  const handleRefresh = () => {
    if (coordinates) {
      locationQuery.refetch();
      weatherQuery.refetch();
      forecastQuery.refetch;
    }
  };

  const locationName = locationQuery.data?.[0];
  console.log(locationName);
  if (
    weatherQuery.error ||
    forecastQuery.error ||
    locationQuery.error ||
    locationQuery.isLoading ||
    locationName === undefined
  ) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Weather Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data</p>
          <Button onClick={handleRefresh} variant="outline" className="w-fit">
            <RefreshCcw className="h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-4 px-2 py-0 md:px-4 lg:px-12">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">
          {locationName.name}&apos;s Weather
        </h1>
      </div>

      <div className="grid gap-4">
        <div className="flex flex-col lg:flex-row gap-4  ">
          <WeatherComponent
            data={weatherQuery.data}
            locationName={locationName}
          ></WeatherComponent>
          <HourlyTemp data={forecastQuery.data}></HourlyTemp>
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherInfo data={weatherQuery.data}></WeatherInfo>
          <Forecast data={forecastQuery.data}></Forecast>
        </div>
      </div>
    </div>
  );
}
