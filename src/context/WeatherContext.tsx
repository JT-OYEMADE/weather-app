import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { notification } from "antd";
import { WeatherContextProviderProps, WeatherLocation, WeatherValue, defaultContextValue, defaultWeatherValue } from "../types";


export interface WeatherContextType {
  weather: WeatherValue;
  location: string;
  setPlace: (place: string) => void;
  values: WeatherValue[];
  place: string;
  temperatureUnit: string;
  toggleTemperatureUnit: () => void;
  windSpeedUnit: string;
  toggleWindSpeedUnit: () => void;
  isLoading: boolean
}

export const WeatherContext = createContext<WeatherContextType>(defaultContextValue);

export const WeatherContextProvider: React.FC<WeatherContextProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherValue>(defaultWeatherValue);
  const [values, setValues] = useState<WeatherValue[]>([]);
  const [place, setPlace] = useState<string>('Lagos');
  const [temperatureUnit, setTemperatureUnit] = useState('Celsius');
  const [windSpeedUnit, setWindSpeedUnit] = useState('km/h');

  const toggleTemperatureUnit = () => {
    setTemperatureUnit((prevUnit) => (prevUnit === 'Celsius' ? 'Fahrenheit' : 'Celsius'));
  };

  const toggleWindSpeedUnit = () => {
    setWindSpeedUnit((prevUnit) => (prevUnit === 'km/h' ? 'mph' : 'km/h'));
  };

  const fetchWeather = useCallback(async (lat?: number, lon?: number) => {
    setIsLoading(true);
    const locationQuery = lat && lon ? `${lat},${lon}` : place;
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
        'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      const weatherData = response.data;
      if (weatherData && weatherData.locations) {
        const thisData = Object.values(response.data.locations)[0] as WeatherLocation;
        setWeather(thisData.values[0]);
        setValues(thisData.values);
        notification.success({
          message: 'Weather Data Updated',
          description: `The weather forecast for ${place} has been successfully updated.`,
          duration: 1.5,
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

  useEffect(() => {
    const fetchCurrentLocationWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        }, (_error) => {
          // Handle error or user denial for location access
          notification.warning({
            message: 'Location Access Denied',
            description: 'Defaulting to Lagos. Allow location access for weather updates based on your current location.',
            duration: 1,
          });
          fetchWeather();
        });
      } else {
        // Geolocation is not supported by this browser, fallback to default location
        notification.warning({
          message: 'Geolocation Not Supported',
          description: 'Defaulting to Lagos. Geolocation is not supported by this browser',
          duration: 1,
        });
        fetchWeather();
      }
    };

    fetchCurrentLocationWeather();
  }, [fetchWeather]);


  return (
    <WeatherContext.Provider value={{ weather, setPlace, values, location: place, place, temperatureUnit, isLoading, toggleTemperatureUnit, windSpeedUnit, toggleWindSpeedUnit, }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => useContext(WeatherContext);
