import React, { useState, useRef, useEffect } from 'react';
import { Play, Square, RotateCcw } from 'lucide-react';

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const elapsedTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedTimeRef.current;
      intervalRef.current = setInterval(() => {
        const currentTime = Date.now() - startTimeRef.current;
        setTime(currentTime);
        elapsedTimeRef.current = currentTime;
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    elapsedTimeRef.current = 0;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const formatTime = (milliseconds: number) => {
    const totalMs = Math.floor(milliseconds);
    const minutes = Math.floor(totalMs / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);
    const ms = Math.floor((totalMs % 1000) / 10);

    return {
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
      milliseconds: ms.toString().padStart(2, '0')
    };
  };

  const { minutes, seconds, milliseconds } = formatTime(time);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] animate-pulse"></div>
      
      <div className="relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full mx-4 border border-white/20">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 tracking-tight">
            Stopwatch
          </h1>
          
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-8 border border-gray-100">
            <div className="font-mono text-4xl md:text-6xl font-bold text-gray-800 leading-none tracking-wider">
              <span className="text-blue-600">{minutes}</span>
              <span className="text-gray-400 mx-1">:</span>
              <span className="text-blue-600">{seconds}</span>
              <span className="text-gray-400 mx-1">.</span>
              <span className="text-blue-400 text-3xl md:text-4xl">{milliseconds}</span>
            </div>
            <div className="text-xs md:text-sm text-gray-500 mt-3 font-medium tracking-wide">
              MM : SS . MS
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleStartStop}
              className={`flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full font-semibold text-white shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                isRunning
                  ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30'
                  : 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/30'
              }`}
            >
              {isRunning ? (
                <Square size={28} className="fill-current" />
              ) : (
                <Play size={28} className="fill-current ml-1" />
              )}
            </button>

            <button
              onClick={handleReset}
              disabled={time === 0}
              className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold text-white shadow-lg shadow-gray-500/30 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:transform-none disabled:shadow-gray-300/20"
            >
              <RotateCcw size={24} />
            </button>
          </div>

          <div className="mt-8 text-xs text-gray-500">
            <p className="font-medium">Precise to 10ms accuracy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;