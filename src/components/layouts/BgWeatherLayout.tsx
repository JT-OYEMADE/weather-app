import { useEffect, useState } from 'react';

// Images
import Clear from '../../assets/images/Clear.jpg';
import Fog from '../../assets/images/fog.png';
import Cloudy from '../../assets/images/Cloudy.jpg';
import Rainy from '../../assets/images/Rainy.jpg';
import Snow from '../../assets/images/snow.jpg';
import Stormy from '../../assets/images/Stormy.jpg';
import Sunny from '../../assets/images/Sunny.jpg';
import { useWeatherContext } from '../../context/WeatherContext';

// Define a mapping between condition keys and images
const conditionImages: { [key: string]: string } = {
  clear: Clear,
  cloud: Cloudy,
  rain: Rainy,
  shower: Rainy,
  snow: Snow,
  fog: Fog,
  thunder: Stormy,
  storm: Stormy,
  sunny: Sunny,
};

const BgWeatherLayout = () => {
  const { weather } = useWeatherContext();
  const [image, setImage] = useState<string>(Clear);

  useEffect(() => {
    // Check if `weather` is a `WeatherValue` and has `conditions`
    console.log(weather, "weather");

    if ('conditions' in weather && weather.conditions) {
      const conditions = weather.conditions.toLowerCase();
      const conditionKey = Object.keys(conditionImages).find(key =>
        conditions.includes(key)
      );
      if (conditionKey) {
        setImage(conditionImages[conditionKey]);
      }
    }
  }, [weather]);

  return (
    <img src={image} alt="weather_image" className="h-screen w-full fixed left-0 top-0 -z-[10]" />
  );
};

export default BgWeatherLayout;
