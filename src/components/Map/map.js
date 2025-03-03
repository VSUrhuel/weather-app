import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: markerIconPng.src,
  shadowUrl: markerShadowPng.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapView({ latitude, longitude, locationName }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interactive Map</CardTitle>
        <CardDescription>
          Explore the exact location based on the provided coordinates. Zoom and
          pan to navigate the area.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {typeof window !== "undefined" && (
          <MapContainer
            center={[latitude, longitude]}
            zoom={13}
            style={{ height: "400px", width: "100%", zIndex: 0 }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[latitude, longitude]} icon={customIcon}>
              <Popup>{locationName || "Selected Location"}</Popup>
            </Marker>
          </MapContainer>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Location data is based on available coordinates and may have slight
          inaccuracies. For best results, verify the location manually.
        </p>
      </CardFooter>
    </Card>
  );
}
