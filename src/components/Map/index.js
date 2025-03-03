import { useReverseGeocodeQuery } from "@/hooks/use-weather";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./map"), { ssr: false });

export default function MapWrapper({ coordinates }) {
  const locationQuery = useReverseGeocodeQuery(coordinates, {
    enabled: !!coordinates,
  });
  const locationName = locationQuery.data?.[0];

  return (
    <Map
      latitude={coordinates.latitude}
      longitude={coordinates.longitude}
      locationName={locationName.name}
      zoom={12}
    />
  );
}
