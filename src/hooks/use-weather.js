"use client";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
  weather: (coordinates) => ["weather", coordinates],
  forecast: (coordinates) => ["forecast", coordinates],
  location: (coordinates) => ["location", coordinates],
};

export function useWeatherQuery(coordinates) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates), // queryKey must be in the object form
    queryFn: () => weatherAPI.getCurrentWeather(coordinates),
    enabled: !!coordinates, // Ensures the query is only executed when coordinates are provided
  });
}

export function useForecastQuery(coordinates) {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinates),
    queryFn: () => weatherAPI.getForecast(coordinates),
    enabled: !!coordinates,
  });
}

export function useReverseGeocodeQuery(coordinates) {
  return useQuery({
    queryKey: WEATHER_KEYS.location(coordinates),
    queryFn: () => weatherAPI.reverseGeocode(coordinates),
    enabled: !!coordinates,
  });
}
