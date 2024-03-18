import { WeatherContextType } from "../context/WeatherContext";
import { ReactNode } from "react";

export interface WeatherContextProviderProps {
  children: ReactNode;
}

export interface WeatherLocation {
  address: string;
  values: WeatherValue[];
}

export interface WeatherValue {
  datetime: any;
  temperature: number;
  windSpeed: number;
  precipitation: number;
  date: string;
  wspd: number;
  humidity: number;
  temp: number;
  heatindex: number;
  conditions: string;
}

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




export const defaultContextValue: WeatherContextType = {
  weather: defaultWeatherValue,
  location: '',
  setPlace: () => { },
  values: [],
  place: 'Lagos',
  temperatureUnit: '',
  toggleTemperatureUnit: () => { },
  windSpeedUnit: '',
  toggleWindSpeedUnit: () => { },
  isLoading: false
};

