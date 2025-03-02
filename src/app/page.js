"use client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CustomHome from "@/components/custom-home";
import WeatherDashboard from "./dashboard/page";
import City from "./city/page";

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
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {/* Custom Home Component Wrapper */}
        <CustomHome defaultTheme="light">
          <Routes>
            {/* Define routes inside Routes */}
            <Route path="/" element={<WeatherDashboard />} />
            <Route path="/city/:name" element={<City />} />{" "}
            {/* Dynamic route for City page */}
          </Routes>
        </CustomHome>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
