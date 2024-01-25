"use client"

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [recording, setRecording] = useState(false);
  const [showLoadingDots, setShowLoadingDots] = useState(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const prevLoadingState = useRef(showLoadingDots);
  const firstClickRef = useRef(true);
  const audioList = [
    '/1.mp3',
    '/2.mp3',
    '/3.mp3',
    '/4.mp3',
    '/5.mp3',
    '/6.mp3',
    // Add more audio files here if needed
  ];

  function toggleRecording() {
    if (firstClickRef.current) {
      new Audio(audioList[0]).play();
      firstClickRef.current = false;
      setCurrentAudioIndex(1);
    } else {
      setRecording(!recording);
      if (recording) {
        setShowLoadingDots(true);
        const randomTime = Math.random() * (6000 - 4000) + 4000;
        setTimeout(() => setShowLoadingDots(false), randomTime);
      }
    }
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === ' ') {
        event.preventDefault(); // Prevent the default spacebar action
        toggleRecording();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [recording]); // Add recording as a dependency

  useEffect(() => {
    if (prevLoadingState.current && !showLoadingDots && !firstClickRef.current) {
      const audio = new Audio(audioList[currentAudioIndex]);
      audio.play();
      const nextIndex = (currentAudioIndex + 1) % audioList.length;
      setCurrentAudioIndex(nextIndex);
    }
    prevLoadingState.current = showLoadingDots;
  }, [showLoadingDots, currentAudioIndex, audioList]);

  useEffect(() => {
    return () => clearTimeout(showLoadingDots);
  }, [recording]);

  return (
    <main className="flex h-screen flex-col items-center bg-gradient-to-t from-rose-600 via-red-500 to-red-600 text-white">
      <div className="flex flex-col items-center justify-center space-y-12 mt-[240px]">
        <button 
          className={`h-[160px] w-[160px] rounded-full shadow-2xl bg-white ${recording ? 'agent-circle' : ''}`}
          onClick={toggleRecording}>
        </button>
        {recording && (
          <div className="flex justify-center items-center space-x-4">
            <p className="text-4xl text-white font-bold">Listening...</p>
          </div>
        )}
        {showLoadingDots && (
          <div className="loading-dots flex justify-center items-center">
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>
    </main>
  );
}
