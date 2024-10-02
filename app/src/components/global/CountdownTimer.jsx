'use client';

import React, { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const CountdownTimer = ({ handleResendEmail }) => {
  const durationInSeconds = 1 * 60;

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [timerKey, setTimerKey] = useState(0);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const restartTimer = () => {
    handleResendEmail();
    setIsButtonDisabled(true);
    setTimerKey((prevKey) => prevKey + 1);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      {isButtonDisabled && (
        <>
          <div className='text-sm text-gray-600 font-bold mb-2'>
            You can resend the email in:
          </div>
          <CountdownCircleTimer
            key={timerKey}
            isPlaying
            size={50}
            strokeWidth={5}
            duration={durationInSeconds}
            colors={[
              ['#10B981', 0.4],
              ['#F59E0B', 0.4],
              ['#EF4444', 0.2],
            ]}
            onComplete={() => {
              setIsButtonDisabled(false);
              return [false, 0];
            }}
          >
            {({ remainingTime }) => (
              <div className='text-xs font-semibold dark:text-white'>
                {formatTime(remainingTime)}
              </div>
            )}
          </CountdownCircleTimer>
        </>
      )}
      {!isButtonDisabled && (
        <button
          className='mt-4 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition-colors duration-200 ease-in-out'
          onClick={restartTimer}
        >
          Resend Email
        </button>
      )}
    </div>
  );
};

export default CountdownTimer;
