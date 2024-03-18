import { useContext } from 'react';
import { WeatherContext, WeatherContextType } from 'context/WeatherContext';

// Custom hook to access weather context
export const useWeather = (): WeatherContextType => {
  // Get weather context from the nearest WeatherContextProvider
  const weatherContext = useContext(WeatherContext);

  // If WeatherContext is not found, log an error message
  if (!weatherContext) {
    console.log("useWeather must be used within a WeatherContextProvider");
  }

  // Return the weather context
  return weatherContext;
};
