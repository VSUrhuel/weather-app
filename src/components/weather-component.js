import React from "react";
import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

export default function WeatherComponent({ data, locationName }) {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;

  const formatTemp = (temp) => {
    return `${Math.round(temp)}°C`;
  };
  return (
    <div>
      <Card className="overflow-hidden w-fit">
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex gap-1 items-center">
                  <h2 className="text-2xl font-bold tracking-tighter">
                    {locationName.name}
                  </h2>
                  {locationName?.state && (
                    <span className="text-muted-foreground">
                      , {locationName.state}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {locationName.country}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <h3 className="lg:text-7xl md:text-5xl text-5xl font-bold tracking-tighter">
                  {formatTemp(temp)}
                </h3>
                <div className="flex flex-col space-y-2">
                  <p className="text-sm font-medium text-gray">
                    Feels like {formatTemp(feels_like)}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="flex items-center gap-1 text-blue-500 w-fit">
                      <ArrowDown className="h-4 w-4 text-blue-500" />
                      {formatTemp(temp_min)}
                    </span>
                    <span className="flex items-center gap-1 text-red-500 w-fit">
                      <ArrowUp className="h-4 w-4 text-red-500" />
                      {formatTemp(temp_max)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 w-fit">
                <div className="flex items-center gap-2 w-fit">
                  <Droplets className="h-4 w-4 text-blue-500 flex items-center" />
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium ">Humidity</p>
                    <p className="text-sm text-muted-foreground">{humidity}%</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-fit">
                  <Wind className="h-4 w-4 text-blue-500 w-fit flex items-center" />
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium ">Wind Speed</p>
                    <p className="text-sm text-muted-foreground">{speed} m/s</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="relative w-full flex items-center max-w-[200px] aspect-square justify-center">
                <img
                  src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                  alt={currentWeather.description}
                  className="w-full h-full object-contain"
                ></img>
                <div className="absolute bottom-0 text-center">
                  <p className="text-sm font-medium capitalize">
                    {currentWeather.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
