"use client";
import CustomHome from "@/components/custom-home";
import { ModeToggle } from "@/components/mode-toggle";
import WeatherDashboard from "./dashboard/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
        <WeatherDashboard> </WeatherDashboard>
      </CustomHome>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
