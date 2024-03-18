import { WeatherContextType } from "../context/WeatherContext";
import { ReactNode } from "react";

// Props for the WeatherContextProvider component
export interface WeatherContextProviderProps {
  children: ReactNode; // ReactNode type for children components
}

// Interface for the weather location data
export interface WeatherLocation {
  address: string; // Address of the location
  values: WeatherValue[]; // Array of WeatherValue objects
}

// Interface for the weather value data
export interface WeatherValue {
  datetime: any; // Datetime of the weather data
  temperature: number; // Temperature value
  windSpeed: number; // Wind speed value
  precipitation: number; // Precipitation value
  date: string; // Date of the weather data
  wspd: number; // Wind speed value
  humidity: number; // Humidity value
  temp: number; // Temperature value
  heatindex: number; // Heat index value
  conditions: string; // Weather conditions
}

// Default value for WeatherValue object
export const defaultWeatherValue: WeatherValue = {
  temperature: 0,
  windSpeed: 0,
  precipitation: 0,
  date: "",
  humidity: 0,
  wspd: 0,
  heatindex: 0,
  conditions: "",
  temp: 0,
  datetime: ""
};

// Default value for WeatherContextType
export const defaultContextValue: WeatherContextType = {
  weather: defaultWeatherValue, // Default WeatherValue object
  location: '', // Default location string
  setPlace: () => { }, // Default function to set location
  values: [], // Default empty array for WeatherValue objects
  place: 'Lagos', // Default place string
  temperatureUnit: '', // Default temperature unit string
  toggleTemperatureUnit: () => { }, // Default function to toggle temperature unit
  windSpeedUnit: '', // Default wind speed unit string
  toggleWindSpeedUnit: () => { }, // Default function to toggle wind speed unit
  isLoading: false // Default loading state
};
