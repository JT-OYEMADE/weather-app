import { useEffect, useState } from 'react';
import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import wind from '../assets/icons/windy.png';

export const MiniCard = ({ time, temp, iconString }: any) => {
  // Initialize the state with a string type and null as initial value
  // You must also specify that the state can be null, hence string | null
  const [icon, setIcon] = useState<string | null>(null);

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes('cloud')) {
        setIcon(cloud);
      } else if (iconString.toLowerCase().includes('rain')) {
        setIcon(rain);
      } else if (iconString.toLowerCase().includes('clear')) {
        setIcon(sun);
      } else if (iconString.toLowerCase().includes('thunder')) {
        setIcon(storm);
      } else if (iconString.toLowerCase().includes('fog')) {
        setIcon(fog);
      } else if (iconString.toLowerCase().includes('snow')) {
        setIcon(snow);
      } else if (iconString.toLowerCase().includes('wind')) {
        setIcon(wind);
      } else {
        // If no condition is met, you might want to set a default icon or leave it as null
        setIcon(null);
      }
    }
  }, [iconString]);

  return (
    <div className='glassCard w-[10rem] h-[10rem] p-4 flex flex-col'>
      <p className='text-center'>
        {new Date(time).toLocaleTimeString('en', { weekday: 'long' }).split(" ")[0]}
      </p>
      <hr />
      <div className='w-full flex justify-center items-center flex-1'>
        {/* Conditional rendering to avoid trying to render an icon when it's null */}
        {icon ? <img src={icon} alt="weather condition icon" className='w-[4rem] h-[4rem]' /> : <span>Forecast not available</span>}
      </div>
      <p className='text-center font-bold'>{temp}&deg;C</p>
    </div>
  );
};
