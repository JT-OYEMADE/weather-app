import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { notification } from "antd";
import { WeatherContextProviderProps, WeatherLocation, WeatherValue, defaultContextValue, defaultWeatherValue } from "../types";

// Define the structure of the WeatherContextType
export interface WeatherContextType {
  weather: WeatherValue; // Current weather data
  location: string; // Current location
  setPlace: (place: string) => void; // Function to set the location
  values: WeatherValue[]; // Array of weather values
  place: string; // Current place
  temperatureUnit: string; // Unit for temperature (Celsius or Fahrenheit)
  toggleTemperatureUnit: () => void; // Function to toggle temperature unit
  windSpeedUnit: string; // Unit for wind speed (km/h or mph)
  toggleWindSpeedUnit: () => void; // Function to toggle wind speed unit
  isLoading: boolean; // Indicates whether data is being loaded
}

// Create a context for weather data
export const WeatherContext = createContext<WeatherContextType>(defaultContextValue);

// WeatherContextProvider component
export const WeatherContextProvider: React.FC<WeatherContextProviderProps> = ({ children }) => {
  // State variables for managing weather data and settings
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherValue>(defaultWeatherValue);
  const [values, setValues] = useState<WeatherValue[]>([]);
  const [place, setPlace] = useState<string>('Lagos');
  const [temperatureUnit, setTemperatureUnit] = useState('Celsius');
  const [windSpeedUnit, setWindSpeedUnit] = useState('km/h');

  // Function to toggle temperature unit between Celsius and Fahrenheit
  const toggleTemperatureUnit = () => {
    setTemperatureUnit((prevUnit) => (prevUnit === 'Celsius' ? 'Fahrenheit' : 'Celsius'));
  };

  // Function to toggle wind speed unit between km/h and mph
  const toggleWindSpeedUnit = () => {
    setWindSpeedUnit((prevUnit) => (prevUnit === 'km/h' ? 'mph' : 'km/h'));
  };

  // Function to fetch weather data from API
  const fetchWeather = useCallback(async (lat?: number, lon?: number) => {
    setIsLoading(true);
    const locationQuery = (lat && lon) ? place : place;
    const options = {
      method: 'GET',
      url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
      params: {
        aggregateHours: '24',
        location: locationQuery,
        contentType: 'json',
        unitGroup: 'metric',
        shortColumnNames: 0,
      },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_API_KEY, // API key for accessing the weather API
        'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      const weatherData = response.data;
      if (weatherData && weatherData.locations) {
        const thisData = Object.values(response.data.locations)[0] as WeatherLocation;
        setWeather(thisData.values[0]); // Set current weather data
        setValues(thisData.values); // Set array of weather values
        setPlace(thisData.address)
        notification.success({
          message: 'Weather Data Updated',
          description: `The weather forecast for ${place} has been successfully updated.`,
          duration: 2,
        });
      }
      setIsLoading(false);
    } catch (e: any) {
      console.error(e);
      let errorMessage = 'The weather forecast for the specified location is currently unavailable.';
      if (e.response && e.response.data) {
        errorMessage = e.response.data.message || errorMessage;
      }
      notification.error({
        message: 'Weather API Error',
        description: errorMessage,
        duration: 2.5,
      });
      setIsLoading(false);
    }
  }, [place]);

  // Effect hook to fetch weather data for the current location
  useEffect(() => {
    const fetchCurrentLocationWeather = () => {
      if (navigator.geolocation) {
        // Get current geolocation
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude); // Fetch weather data for current coordinates
        }, (_error) => {
          // Handle error or user denial for location access
          notification.warning({
            message: 'Location Access Denied',
            description: 'Allow location access for weather updates based on your current location.',
            duration: 2.5,
          });
          fetchWeather(); // Fallback to default location (Lagos)
        });
      } else {
        // Geolocation is not supported by this browser, fallback to default location
        notification.warning({
          message: 'Geolocation Not Supported',
          description: 'Defaulting to Lagos. Geolocation is not supported by this browser',
          duration: 2.5,
        });
        fetchWeather(); // Fallback to default location (Lagos)
      }
    };

    fetchCurrentLocationWeather();
  }, [fetchWeather]);

  // Provide weather data and functions to child components via context
  return (
    <WeatherContext.Provider value={{ weather, setPlace, values, location: place, place, temperatureUnit, isLoading, toggleTemperatureUnit, windSpeedUnit, toggleWindSpeedUnit }}>
      {children}
    </WeatherContext.Provider>
  );
};

// Custom hook to access weather context
export const useWeatherContext = () => useContext(WeatherContext);
