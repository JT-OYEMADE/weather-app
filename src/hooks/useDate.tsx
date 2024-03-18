import { useEffect, useState } from 'react';

// Custom hook to manage current date and time
export const useDate = (locale = 'en') => {
  // State variable to store current date and time
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Effect to update current date and time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60 * 1000); // Update every minute

    // Clean up the interval timer
    return () => clearInterval(timer);
  }, []);

  // Function to format date in long weekday, date number, and long month format
  const formatDate = (date: Date) => {
    const day = date.toLocaleDateString(locale, { weekday: 'long' });
    const dateNumber = date.getDate();
    const month = date.toLocaleDateString(locale, { month: 'long' });
    return `${day}, ${dateNumber} ${month}`;
  };

  // Function to format time in 12-hour format with leading zeros for hours and minutes
  const formatTime = (date: Date) => date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: true });

  // Return formatted date and time
  return {
    date: formatDate(currentDateTime), // Formatted date
    time: formatTime(currentDateTime), // Formatted time
  };
};
