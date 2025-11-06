
import React, { useState, useEffect } from 'react';

// Set the target date once when the module is loaded.
// This ensures the countdown is stable and consistent.
const targetDate = new Date();
targetDate.setHours(targetDate.getHours() + 72);

const calculateTimeLeft = () => {
  const difference = +targetDate - +new Date();
  let timeLeft = {
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0
  };

  if (difference > 0) {
    timeLeft = {
      dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
      horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutos: Math.floor((difference / 1000 / 60) % 60),
      segundos: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Set up an interval to update the countdown every second.
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clean up the interval when the component unmounts.
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center my-6 space-x-2 md:space-x-4">
      {Object.entries(timeLeft).map(([interval, value]) => (
        <div key={interval} className="flex flex-col items-center p-2 text-white bg-white/10 rounded-lg min-w-[60px] md:min-w-[80px]">
          <span className="text-2xl font-bold md:text-4xl">{String(value).padStart(2, '0')}</span>
          <span className="text-xs uppercase">{interval}</span>
        </div>
      ))}
    </div>
  );
};
