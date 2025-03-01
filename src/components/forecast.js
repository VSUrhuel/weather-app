import { format } from "date-fns";
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
        humidity: forecast.main.humidity,
        wind_speed: forecast.wind.speed,
      };
    } else {
      if (forecast.main.temp_min < acc[date].temp_min) {
        acc[date].temp_min = forecast.main.temp_min;
      }
      if (forecast.main.temp_max > acc[date].temp_max) {
        acc[date].temp_max = forecast.main.temp_max;
      }
      if (forecast.main.humidity > acc[date].humidity) {
        acc[date].humidity = forecast.main.humidity;
      }
      if (forecast.wind.speed > acc[date].wind_speed) {
        acc[date].wind_speed = forecast.wind.speed;
      }
    }
    return acc;
  }, {});
  const forecast = Object.values(dailyForecast).slice(0, 6);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Forecast</CardTitle>
        <CardDescription>
          This forecast is powered by OpenWeather API.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {forecast.map((day) => (
            <div
              key={day.date}
              className="grid gap-2 grid-cols-1 justify-start lg:grid-cols-3 border p-4 rounded-lg lg:space-between"
            >
              <div>
                <p className="font-medium">
                  {format(new Date(day.date * 1000), "EEEE, MMM d")}
                </p>
                <p className="capitalize tex-sm tex-muted-foreground">
                  {day.weather.description}
                </p>
              </div>

              <div className="flex  items-center justify-start lg:justify-center gap-4">
                <span className="flex items-center gap-1  w-fit">
                  <ArrowDown className="h-4 w-4 text-blue-500" />
                  {Math.round(day.temp_min)}°
                </span>
                <span className="flex items-center gap-1  w-fit">
                  <ArrowUp className="h-4 w-4 text-red-500" />
                  {Math.round(day.temp_max)}°
                </span>
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
