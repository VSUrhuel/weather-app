import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "./ui/card";
import {
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart,
  Tooltip,
} from "recharts";
import { format } from "date-fns";

export default function HourlyTemp({ data }) {
  const lineChartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Today's Temperature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer
            width={"100%"}
            height={"100%"}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <LineChart data={lineChartData}>
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#0000FF"
                strokeWidth={2}
                dot={false}
              />

              <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
