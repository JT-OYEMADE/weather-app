import { useContext } from 'react';
import { WeatherContext, WeatherContextType } from 'context/WeatherContext'; // Ensure path is correct

export const useWeather = (): WeatherContextType => {
  const weatherContext = useContext(WeatherContext);
  if (!weatherContext) {
    // This condition will now never be true because we have a default value for the context,
    // but it's good to have for the sake of TypeScript's null checking.
    // throw new Error('useWeather must be used within a WeatherContextProvider');
    console.log("useWeather must be used within a WeatherContextProvider")
  }
  return weatherContext;
};
