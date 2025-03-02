import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Gauge } from "lucide-react";

export default function Forecast({ data }) {
  console.log(data);
  const dailyForecast = data.list.reduce((acc, forecast) => {
    if (!forecast || !forecast.main || !forecast.weather || !forecast.wind) {
      console.log(forecast);
      return acc;
    }

    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        weather: forecast.weather[0],
        date: forecast.dt,
        humidity: forecast.main.humidity, // ✅ Fixed typo
        wind_speed: forecast.wind.speed,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
      acc[date].humidity = Math.max(acc[date].humidity, forecast.main.humidity);
      acc[date].wind_speed = Math.max(
        acc[date].wind_speed,
        forecast.wind.speed
      );
    }

    return acc;
  }, {});

  // Get only 7 days
  const forecast = Object.values(dailyForecast).slice(0, 7);

  console.log(forecast);

  return (
    <Card>
      <CardHeader>
        <CardTitle>7-Day Forecast</CardTitle>
        <CardDescription>
          This forecast is powered by OpenWeather API.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {forecast.map((day) => (
            <div
              key={day.date}
              className="grid gap-2 grid-cols-1 justify-center lg:grid-cols-3 border p-4 rounded-lg lg:space-between"
            >
              <div className="justify-center ">
                <p className="font-medium text-2xl">
                  {format(new Date(day.date * 1000), "EEEE")}
                </p>
                <p className="font-normal text-muted-foreground">
                  {format(new Date(day.date * 1000), "MMM d")}
                </p>
              </div>

              <div className=" flex items-start justify-start lg:justify-center gap-4 h-20 w-full p-0">
                <Image
                  src={`https://openweathermap.org/img/wn/${day.weather.icon}@4x.png`}
                  alt={day.weather.description}
                  width={160}
                  height={160}
                  className=" h-full object-contain transform transition-transform duration-500 ease-in-out sm:scale-75 lg:scale-100 w-fit md:w-full"
                />
              </div>

              <div className="flex justify-start  lg:justify-end gap-3">
                <span className="flex items-center gap-1  w-fit">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  {day.humidity}%
                </span>
                <span className="flex items-center gap-1 w-fit">
                  <Gauge className="h-4 w-4 text-blue-500" />
                  {day.wind_speed}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground text-sm">
          Weather forecasts may have errors due to changing atmospheric
          conditions, data inaccuracies, and model limitations.
        </p>
      </CardFooter>
    </Card>
  );
}
