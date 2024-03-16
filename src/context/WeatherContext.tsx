// WeatherContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { notification } from "antd";
import { ReactNode } from "react";

interface WeatherContextProviderProps {
  children: ReactNode;
}

interface WeatherLocation {
  address: string;
  values: WeatherValue[];
}

interface WeatherValue {
  temperature: number; // It seems you've replaced this with 'temp' in App.tsx
  windSpeed: number; // It seems you've replaced this with 'wspd' in App.tsx
  precipitation: number;
  date: string;
  wspd: number;
  humidity: number;
  temp: number;
  heatindex: number;
  conditions: string;
}


// Streamlined WeatherValue without redundant properties
const defaultWeatherValue: WeatherValue = {
  temperature: 0,
  windSpeed: 0,
  precipitation: 0,
  date: "",
  humidity: 0,
  wspd: 0,
  heatindex: 0,
  conditions: "",
  temp: 0
};

export interface WeatherContextType {
  weather: WeatherValue;
  thisLocation: string;
  setPlace: (place: string) => void;
  values: WeatherValue[];
  place: string;
}

const defaultContextValue: WeatherContextType = {
  weather: defaultWeatherValue,
  thisLocation: '',
  setPlace: () => { },
  values: [],
  place: 'Jaipur',
};

export const WeatherContext = createContext<WeatherContextType>(defaultContextValue);

export const WeatherContextProvider: React.FC<WeatherContextProviderProps> = ({ children }) => {
  const [weather, setWeather] = useState<WeatherValue>(defaultWeatherValue);
  const [values, setValues] = useState<WeatherValue[]>([]);
  const [place, setPlace] = useState<string>('Lagos');

  const fetchWeather = useCallback(async () => {
    const options = {
      method: 'GET',
      url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
      params: {
        aggregateHours: '24',
        location: place,
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
      const weatherData = response.data; // Adjust according to actual API response structure
      if (weatherData && weatherData.locations) {
        const thisData = Object.values(response.data.locations)[0] as WeatherLocation;
        setWeather(thisData.values[0]);
        setValues(thisData.values);
      }
    } catch (e) {
      console.error(e);
      let errorMessage = 'Failed to fetch weather data.';
      if (e instanceof Error) {
        // Now TypeScript knows `e` is an Error, so `e.message` is safe to access
        errorMessage = e.message;
      }
      notification.error({
        message: 'Weather API Error',
        description: errorMessage,
      });
    }
  }, [place]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return (
    <WeatherContext.Provider value={{ weather, setPlace, values, thisLocation: place, place }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => useContext(WeatherContext);


// const thisData = Object.values(response.data.locations)[0] as WeatherLocation;
