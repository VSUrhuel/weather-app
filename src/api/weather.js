import { API_CONFIG } from "./config";

class WeatherAPI {
  // Private method to create API URL
  #createUrl(endpoint, params) {
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      ...params,
    });

    return `${endpoint}?${searchParams.toString()}`;
  }

  // Private method to fetch data
  async #fetchData(url) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Weather API Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      return null; // Prevents breaking the app on fetch failure
    }
  }

  // Get current weather data
  async getCurrentWeather(coordinates) {
    const url = this.#createUrl(`${API_CONFIG.BASE_URL}/weather`, {
      lat: coordinates.latitude,
      lon: coordinates.longitude,
      units: "metric",
    });
    return this.#fetchData(url);
  }

  // Get weather forecast data
  async getForecast(coordinates) {
    const url = this.#createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
      lat: coordinates.latitude,
      lon: coordinates.longitude,
      units: "metric",
    });
    return this.#fetchData(url);
  }

  // Reverse geocode (lat, lon → location name)
  async reverseGeocode(coordinates) {
    try {
      const url = this.#createUrl(`${API_CONFIG.GEO}/reverse`, {
        lat: coordinates.latitude,
        lon: coordinates.longitude,
        limit: "1",
      });

      return this.#fetchData(url); // Call your fetch function
    } catch (error) {
      console.error("Error in reverseGeocode:", error); // Catch any errors and log them
    }
  }

  // Search for locations by name
  async searchLocations(query) {
    const url = this.#createUrl(`${API_CONFIG.GEO}/direct`, {
      q: query,
      limit: "5",
    });
    return this.#fetchData(url);
  }
}

// Export a singleton instance of WeatherAPI
export const weatherAPI = new WeatherAPI();
