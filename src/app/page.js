"use client";

import CustomHome from "@/components/custom-home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import WeatherDashboard from "./dashboard/page";

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
