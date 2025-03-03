"use client";
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

export default function WeatherDashboard() {
  const { coordinates, error, getLocation, loading } = useGeolocation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRefresh = () => {
    getLocation();
  };

  // ✅ Always call hooks, but control execution with `enabled`
  const locationQuery = useReverseGeocodeQuery(coordinates, {
    enabled: !!coordinates,
  });

  const weatherQuery = useWeatherQuery(coordinates, {
    enabled: !!coordinates,
  });

  const forecastQuery = useForecastQuery(coordinates, {
    enabled: !!coordinates,
  });

  if (!isClient) {
    return <WeatherSkeleton />;
  }

  if (loading) {
    return <WeatherSkeleton />;
  }

  if (error) {
    return <WeatherSkeleton />;
  }

  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location to see your local weather</p>
          <Button onClick={getLocation} variant="outline" className="w-fit">
            <MapPin className="h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = locationQuery.data?.[0];

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
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCcw
            className={`h-4 w-4 ${
              weatherQuery.isFetching ? "animate-spin" : ""
            }`}
          ></RefreshCcw>
        </Button>
      </div>

      <div className="grid gap-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <WeatherComponent
            data={weatherQuery.data}
            locationName={locationName}
          />
          <HourlyTemp data={forecastQuery.data} />
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherInfo data={weatherQuery.data} />
          <Forecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
}
