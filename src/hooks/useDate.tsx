import { useEffect, useState } from 'react';

export const useDate = (locale = 'en') => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const day = date.toLocaleDateString(locale, { weekday: 'long' });
    const dateNumber = date.getDate();
    const month = date.toLocaleDateString(locale, { month: 'long' });
    return `${day}, ${dateNumber} ${month}`;
  };

  const formatTime = (date: Date) => date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: true });

  return {
    date: formatDate(currentDateTime),
    time: formatTime(currentDateTime),
  };
};
