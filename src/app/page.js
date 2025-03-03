"use client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CustomHome from "@/components/custom-home";
import WeatherDashboard from "./dashboard/page";
import City from "./city/page";
import { useSearchParams } from "next/navigation";
import NotFound from "./not-found";

// Wrapper component to extract query params
import { useEffect, useState } from "react";
function CityWrapper() {
  const searchParams = useSearchParams();
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
    country: null,
  });

  useEffect(() => {
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const country = searchParams.get("country");

    if (lat && lon && country) {
      setLocation((prev) => {
        if (prev.lat !== lat || prev.lon !== lon || prev.country !== country) {
          return { lat, lon, country };
        }
        return prev; // Prevent unnecessary re-renders
      });
    } else if (!location.lat && !location.lon) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation((prev) => {
            if (!prev.lat && !prev.lon) {
              return {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                country: "PH",
              };
            }
            return prev;
          });
        },
        (error) => {
          console.error("Error getting current location", error);
        }
      );
    }
  }, [searchParams]);

  return (
    <City
      latitude={location.lat}
      longitude={location.lon}
      country={location.country}
    />
  );
} // Remove location.lat & location.lon from dependencies

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomHome defaultTheme="light">
        <WeatherDashboard />
      </CustomHome>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
