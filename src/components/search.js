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
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import { Loader2, Map, MapIcon, SearchIcon } from "lucide-react";
import { useLocationQuery } from "@/hooks/use-weather";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const { data, isLoading } = useLocationQuery(query);
  console.log(location);
  console.log(data);
  const handleClick = () => {
    setOpen(true);
  };
  const navigate = useNavigate();
  const handleSelect = (value) => {
    console.log(value);
    const [name, lat, lon, country] = value.split("|");
    console.log(value);
    const queryParams = new URLSearchParams({
      lat,
      lon,
      country,
    }).toString();
    console.log(queryParams);
    // Navigate with encoded values for safety
    setOpen(false);
    navigate(`/city/${encodeURIComponent(name)}?${queryParams}`);
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
              {data.map((location) => {
                return (
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
                );
              })}
              <CommandItem>Calendar</CommandItem>

              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
