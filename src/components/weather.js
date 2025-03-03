import {
  Compass,
  Droplets,
  Gauge,
  icons,
  Sunrise,
  Sunset,
  Wind,
} from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { format } from "date-fns";

export default function WeatherInfo({ data }) {
  const { wind, main, sys } = data;

  const convTime = (time) => {
    return format(new Date(time * 1000), "h:mm a");
  };

  const getWindDirection = (deg) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    deg = deg % 360;
    if (deg < 0) deg = 360 + deg;

    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  const info = [
    {
      title: "Sunrise",
      value: convTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: convTime(sys.sunset),
      icon: Sunset,
      color: "text-green-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} ${wind.deg}°`,
      icon: Compass,
      color: "text-purple-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-blue-500",
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
        <CardDescription>
          This includes information related to sunrise, sunset, wind direction,
          and pressure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 sm:grid-cols-1 lg:gap-4 lg:grid-cols-2">
          {info.map((item, index) => (
            <div
              key={index}
              className="flex gap-3 items-center  rounded-lg border p-4"
            >
              {React.createElement(item.icon, { className: item.color })}
              <div>
                <p className="font-semibold leading-none">{item.title}</p>
                <p className="text-muted-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Weather information may not always be accurate and is subject to
          real-time changes.
        </p>
      </CardFooter>
    </Card>
  );
}
