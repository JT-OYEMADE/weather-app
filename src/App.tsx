import { useState, FormEvent, useContext } from 'react';
import './App.css';
import searchIcon from './assets/icons/search.svg';
import BgWeatherLayout from './components/layouts/BgWeatherLayout';
import { useWeatherContext } from './context/WeatherContext';
import { WeatherCard } from './components/WeatherCard';
import { MiniCard } from './components/MiniCards';
import { WeatherContext } from './context/WeatherContext'
import { Spin } from 'antd';




function App() {
  const [input, setInput] = useState('');
  const weatherContext = useWeatherContext();
  const { isLoading } = useWeatherContext();



  const { weather, location, setPlace, values } = weatherContext;
  const { temperatureUnit, toggleTemperatureUnit } = useContext(WeatherContext);
  const handleToggleUnit = (unit: string) => {
    if (unit !== temperatureUnit) {
      toggleTemperatureUnit();
    }
  };


  const submitCity = (e: FormEvent) => {
    e.preventDefault();
    setPlace(input);
    setInput('');
  };

  return (
    <div className='w-full h-screen text-white px-8'>

      <nav className='w-full p-3 flex justify-between items-center'>
        <h1 className='font-bold tracking-wide text-3xl'>Weather App</h1>
        <div className='flex flex-row justify-between gap-5'>
          <form onSubmit={submitCity} className='bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
            <img src={searchIcon} alt="Search" className='w-[1.5rem] h-[1.5rem]' />
            <input type="text" placeholder='Search city' className='focus:outline-none w-full rounded-md text-[#212121] text-md' value={input} onChange={e => setInput(e.target.value)} />
          </form>
          <div className='flex flex-row font-bold text-2xl justify-between items-center gap-1'>
            <h1 className='cursor-pointer' onClick={() => handleToggleUnit('Celsius')}>&deg;C</h1> | <h1 className='cursor-pointer' onClick={() => handleToggleUnit('Fahrenheit')}>&deg;F</h1>
          </div>
        </div>
      </nav>
      <BgWeatherLayout />
      {isLoading ? (
        <div className="flex justify-center items-center " style={{ height: '80vh', color: 'white' }}>
          <Spin size="large" className='whiteSpinner' />
        </div>
      ) : (
        <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
          <WeatherCard
            place={location}
            windspeed={weather.wspd}
            humidity={weather.humidity}
            temperature={weather.temp}
            heatIndex={weather.heatindex}
            iconString={weather.conditions}
            conditions={weather.conditions}
          />

          <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
            {
              values?.slice(1, 7).map(curr => {
                return (
                  <MiniCard
                    key={curr.datetime}
                    time={curr.datetime}
                    temp={curr.temp}
                    iconString={curr.conditions}
                  />
                )
              })
            }
          </div>
        </main>)}
    </div>
  );
}

export default App;
