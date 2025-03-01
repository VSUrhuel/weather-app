import React, { useState, useEffect } from "react";

export default function useGeolocation() {
  const [locationData, setLocationData] = useState({
    coordinates: null,
    loading: true,
    error: null,
  });

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationData((prev) => ({
        ...prev,
        coordinates: null,
        loading: false,
        error: "Geolocation is not supported by this browser.",
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationData({
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          loading: false,
          error: null,
        });
      },
      (error) => {
        let errorMessage = "";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "User denied the request for Geolocation.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
          case error.UNKNOWN_ERROR:
            errorMessage = "An unknown error occurred.";
            break;
        }

        setLocationData((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
          coordinates: null,
        }));
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { ...locationData, getLocation };
}
