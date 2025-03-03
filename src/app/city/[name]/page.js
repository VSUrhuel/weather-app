"use client";
import { useParams, useSearchParams } from "next/navigation"; // useSearchParams for query params
import Forecast from "@/components/forecast";
import React, { useState, useEffect } from "react";
import HourlyTemp from "@/components/hourly-temp";
import WeatherInfo from "@/components/weather";
import WeatherComponent from "@/components/weather-component";
import WeatherSkeleton from "@/components/weather-sekeleton";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/use-weather";
import CustomHome from "@/components/custom-home";
import Map from "@/components/Map";

export default function City() {
  const searchParams = useSearchParams(); // To get lat, lon, country from query params

  // Fetch query parameters
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lon");
  const country = searchParams.get("country");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const coordinates =
    latitude && longitude
      ? { latitude: parseFloat(latitude), longitude: parseFloat(longitude) }
      : null;

  const locationQuery = useReverseGeocodeQuery(coordinates, {
    enabled: !!coordinates,
  });
  const weatherQuery = useWeatherQuery(coordinates, { enabled: !!coordinates });
  const forecastQuery = useForecastQuery(coordinates, {
    enabled: !!coordinates,
  });

  if (!isClient) {
    <CustomHome>
      <WeatherSkeleton />
    </CustomHome>;
  }

  if (!coordinates) {
    <CustomHome>
      <WeatherSkeleton />
    </CustomHome>;
  }

  const handleRefresh = () => {
    locationQuery.refetch();
    weatherQuery.refetch();
    forecastQuery.refetch();
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
      <CustomHome>
        <WeatherSkeleton />
      </CustomHome>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return (
      <CustomHome>
        <WeatherSkeleton />
      </CustomHome>
    );
  }

  return (
    <>
      <CustomHome>
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
              <div className="grid gap-4">
                <WeatherInfo data={weatherQuery.data} className="" />

                <Map coordinates={coordinates} className="h-full w-full" />
              </div>

              <Forecast data={forecastQuery.data} />
            </div>
          </div>
        </div>
      </CustomHome>
    </>
  );
}
