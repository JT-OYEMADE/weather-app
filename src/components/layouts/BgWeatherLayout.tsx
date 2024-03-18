import { useEffect, useState } from 'react';
import { useWeatherContext } from '../../context/WeatherContext';

const BgWeatherLayout = () => {
  const { weather } = useWeatherContext();
  const [background, setBackground] = useState<string>("from-cyan-700 to-blue-700");

  useEffect(() => {
    const formatBackground = () => {
      if (!weather) return "from-cyan-700 to-blue-700";
      const threshold = 30;
      if (weather.temp <= threshold) {
        setBackground("from-cyan-700 to-blue-700"); // Cooler temperature
      } else {
        setBackground("from-yellow-700 to-orange-500"); // Warmer temperature
      }
    };

    formatBackground();
  }, [weather]);

  const bgClass = `h-screen w-full fixed left-0 top-0 -z-10 bg-gradient-to-br ${background}`;

  return <div className={bgClass}></div>;
};

export default BgWeatherLayout;
