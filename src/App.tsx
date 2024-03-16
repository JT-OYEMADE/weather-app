import { useState, FormEvent } from 'react';
import './App.css';
import searchIcon from './assets/icons/search.svg';
import BgWeatherLayout from './components/layouts/BgWeatherLayout';
import { useWeatherContext } from './context/WeatherContext';
import { WeatherCard } from './components/WeatherCard';

function App() {
  const [input, setInput] = useState('');
  const weatherContext = useWeatherContext();

  if (!weatherContext) {
    return <div>Loading...</div>; // or any other fallback UI
  }

  const { weather, thisLocation, setPlace } = weatherContext;

  const submitCity = (e: FormEvent) => {
    e.preventDefault();
    setPlace(input);
    setInput('');
  };

  return (
    <div className='w-full h-screen text-white px-8'>
      <nav className='w-full p-3 flex justify-between items-center'>
        <h1 className='font-bold tracking-wide text-3xl'>Weather App</h1>
        <form onSubmit={submitCity} className='bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
          <img src={searchIcon} alt="Search" className='w-[1.5rem] h-[1.5rem]' />
          <input type="text" placeholder='Search city' className='focus:outline-none w-full text-[#212121] text-lg' value={input} onChange={e => setInput(e.target.value)} />
        </form>
      </nav>
      <BgWeatherLayout />
      <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
        <WeatherCard
          place={thisLocation}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          temperature={weather.temp}
          heatIndex={weather.heatindex}
          iconString={weather.conditions}
          conditions={weather.conditions}
        />
      </main>
    </div>
  );
}

export default App;
