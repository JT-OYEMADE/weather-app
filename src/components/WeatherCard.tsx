import { useEffect, useState, useContext } from 'react'
import { useDate } from '../hooks'
import sun from '../assets/icons/sun.png'
import cloud from '../assets/icons/cloud.png'
import fog from '../assets/icons/fog.png'
import rain from '../assets/icons/rain.png'
import snow from '../assets/icons/snow.png'
import storm from '../assets/icons/storm.png'
import wind from '../assets/icons/windy.png'
import '../index.css'
import { WeatherContext } from '../context/WeatherContext';

interface WeatherValue {
  temperature: number;
  windSpeed: number;
  precipitation: number;
  date: string; // Assuming the date is a string, adjust according to your API's format
  conditions?: string;
  humidity?: string;
  windspeed?: any;
  place?: string;
  heatIndex?: any
  iconString?: string
}

export const WeatherCard = ({ temperature, windspeed, humidity, place, heatIndex, iconString, conditions }: any) => {

  const [icon, setIcon] = useState(sun)
  const { time } = useDate()
  const { temperatureUnit, windSpeedUnit, toggleWindSpeedUnit } = useContext(WeatherContext);

  const displayTemperature = temperatureUnit === 'Celsius' ? temperature : (temperature * 9 / 5) + 32;
  const displayWindSpeed = windSpeedUnit === 'km/h' ? windspeed : windspeed / 1.609; // 1 mile = 1.609 kilometers

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes('cloud')) {
        setIcon(cloud)
      } else if (iconString.toLowerCase().includes('rain')) {
        setIcon(rain)
      } else if (iconString.toLowerCase().includes('clear')) {
        setIcon(sun)
      } else if (iconString.toLowerCase().includes('thunder')) {
        setIcon(storm)
      } else if (iconString.toLowerCase().includes('fog')) {
        setIcon(fog)
      } else if (iconString.toLowerCase().includes('snow')) {
        setIcon(snow)
      } else if (iconString.toLowerCase().includes('wind')) {
        setIcon(wind)
      }
    }
  }, [iconString])

  const capitalizeFirstLetter = (string: string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <div className='w-[22rem] min-w-[22rem] h-[30rem] glasscard p-4 mb-5'>
      <div className='glass-card'>
        <p className='font-bold text-xl'>{displayWindSpeed.toFixed(2)} {windSpeedUnit}</p>
        <button onClick={toggleWindSpeedUnit}> Switch to {windSpeedUnit === 'km/h' ? 'mph' : 'km/h'}</button>
      </div>
      <div className='flex w-full just-center, items-center gap-4 mt-12 mb-4'>
        <img src={icon} alt="weather_icon" />
        <p className='font-bold text-5xl flex justify-center items-center' >{displayTemperature.toFixed(1)} &deg;{temperatureUnit === 'Celsius' ? 'C' : 'F'}</p>
      </div>
      <div className='font-bold text-center text-xl'>
        {capitalizeFirstLetter(place)}
      </div>
      <div className='w-full flex justify-between items-center mt-4'>
        <p className='flex-1 text-center p-2'>{new Date().toDateString()}</p>
        <p className='flex-1 text-center p-2'>{time}</p>
      </div>
      <div className='w-full flex justify-between items-center mt-4 gap-4'>
        <p className='flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-lg'>Wind Speed <p className='font-normal'>{displayWindSpeed.toFixed(2)} {windSpeedUnit}</p></p>
        <p className='flex-1 text-center p-2 font-bold rounded-lg bg-green-600'>Humidity <p className='font-normal'>{humidity} gm/m&#179;</p></p>
      </div>
      <div className='w-full p-3 mt-4 flex justify-between items-center'>
        <p className='font-semibold text-lg'>Heat Index</p>
        <p className='text-lg'>{heatIndex ? heatIndex : 'N/A'}</p>
      </div>
      <hr className='bg-slate-600' />
      <div className='w-full p-4 flex justify-center items-center text-3xl font-semibold'>
        {conditions}
      </div>
    </div>
  )
}