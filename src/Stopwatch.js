import React, { useState, useEffect } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const toggleTime = () => setRunning(!running);

  const numbersStyle = "text-9xl ";
  const handleKey = (e) => {
    console.log("works");
    toggleTime();
  };

  const getStartorStop = () => {
    if (running) {
      return "Stop";
    }
    return "Start";
  };

  const changeIfActive = `${running ? "text-green-700" : "text-black"}`;

  return (
    <div className="w-full pt-8 font-mono text-center text-black bg-green-200 rounded-b-xl stopwatch">
      <div className={`numbers capitalize ${changeIfActive}`}>
        {/* <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span> */}
        <span className={` ${numbersStyle}`}>
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
        </span>
        <span className={` ${numbersStyle}`}>
          {("0" + ((time / 10) % 100)).slice(-2)}
        </span>
      </div>
      <div className="p-4 ">
        <button
          className={` capitalize m-4  ${running} : 'text-blue-300' `}
          type="text"
          onClick={handleKey}
        >
          {getStartorStop()}
        </button>
        {/* <button onClick={() => setRunning(true)}>Start</button>
        <button onClick={() => setRunning(false)}>Stop</button> */}
        <button onClick={() => setTime(0)}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
