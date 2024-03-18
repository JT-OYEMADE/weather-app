import { useContext } from 'react';
import { WeatherContext, WeatherContextType } from 'context/WeatherContext';

export const useWeather = (): WeatherContextType => {
  const weatherContext = useContext(WeatherContext);
  if (!weatherContext) {
    console.log("useWeather must be used within a WeatherContextProvider")
  }
  return weatherContext;
};
