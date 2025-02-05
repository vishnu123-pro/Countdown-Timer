import React, { useEffect, useRef, useState } from 'react'
import './counterTimer.css';

const CounterTimer = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const intervalRef = useRef(null);

  const handleInput = (e) => {
    setTime(parseInt(e.target.value * 60));
  };

  const formatTime = () => {
    const min = String(Math.floor(time / 60)).padStart(2,'0');
    const sec = String(time % 60).padStart(2, '0');
    return `${min} : ${sec}`;
  };

  const handleStart = () =>{
    setIsActive(true);
    setIsPause(false);
  };


  useEffect( ()=>{
    if(isActive && !isPause && time > 0){
        intervalRef.current = setInterval(()=>{
        setTime((pre) => pre - 1);
      }, 1000);
    }else if(time === 0){
      clearInterval(intervalRef.current);
      setIsActive(false);
      // alert("Timer has end!");
    }
    return ()=> clearInterval(intervalRef.current);
  }, [isActive, isPause, time]);

  const handlePause = () => {
    setIsPause(!isPause);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setIsPause(false);
    setTime(0);
  }

  return (
    <div className='countdown-timer'>
      <h1>Countdown Timer</h1>

      <div className='timer-display'>
        <input type="number" placeholder='Enter time in minutes' onChange={handleInput} />
        <div> {formatTime()} </div>
      </div>

      <div className='timer-controls'>
        <button onClick={handleStart} disabled={isActive && !isPause}>Start</button>
        <button onClick={handlePause} disabled={!isActive}>{isPause ? 'Resume' : 'Pause'}</button>
        <button onClick={handleReset}>Reset</button>

      </div>
      
    </div>
  )
}

export default CounterTimer;
