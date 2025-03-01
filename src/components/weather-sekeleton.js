import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function WeatherSkeleton() {
  return (
    <div>
      <div className="grid gap-6">
        <Skeleton className="h-[200px] w-full rounded-lg" />
        <Skeleton className="h-[200px] w-full rounded-lg" />
        <div className="grid  md:grid-cols-2 gap-6">
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
