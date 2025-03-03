"use client";

import React from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import { Loader2, SearchIcon } from "lucide-react";
import { useLocationQuery } from "@/hooks/use-weather";
import { useRouter } from "next/navigation"; // ✅ Use Next.js router
import City from "@/app/city/[name]/page";

export default function Search() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const { data, isLoading } = useLocationQuery(query);

  const router = useRouter(); // ✅ Use Next.js router

  const handleClick = () => {
    setOpen(true);
  };

  const handleSelect = (value) => {
    const [name, lat, lon, country] = value.split("|");

    router.push(`/city/${name}?lat=${lat}&lon=${lon}&country=${country}`);

    setOpen(false); // Ensure setOpen is declared properly in your state
  };

  return (
    <>
      <Button
        onClick={handleClick}
        className="items-start justify-start lg:w-64"
        variant="outline"
      >
        <SearchIcon className="h-4 w-4" />
        Find Cities...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Find Cities..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {query.length > 2 && !isLoading && (
            <CommandEmpty>No cities found.</CommandEmpty>
          )}

          <CommandSeparator />
          {data && data.length > 0 && (
            <CommandGroup heading="Suggestions">
              {isLoading && (
                <div className="items-center flex justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              )}
              {data.map((location) => (
                <CommandItem
                  key={`${location.lat}-${location.lon}`}
                  value={`${location.name}|${location.lat}|${location.lon}|${location.country}`}
                  onSelect={handleSelect}
                >
                  <span className="flex items-center gap-2">
                    <SearchIcon className="h-4 w-4" />
                    {location.name}
                  </span>
                  {location.state && (
                    <span className="text-muted-foreground">
                      , {location.state}
                    </span>
                  )}
                  <span className="text-muted-foreground">
                    , {location.country}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
