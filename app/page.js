"use client"

import { useEffect, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';

export default function Home() {
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    setAudio(new Audio('intro.mp3')); // replace with your audio file path

    anime({
      targets: '.agent-circle',
      scale: [
        { value: .9, easing: 'easeOutSine', duration: 500 },
        { value: 1, easing: 'easeInOutQuad', duration: 1200 }
      ],
      borderRadius: ['80%', '100%'],
      easing: 'easeInOutQuad',
      duration: 2000,
      loop: true
    });
  }, []);

  const playAudio = () => {
    if (audio) {
      audio.play();
    }
  };

  return (
    <main className="flex h-screen flex-col items-center bg-gradient-to-t from-rose-600 via-red-500 to-red-600">
      <div className="flex flex-col items-center justify-center space-y-12 mt-[240px]">
        <div className="agent-circle bg-white h-[160px] w-[160px] rounded-full" onClick={playAudio}></div>
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold">What's your name?</h2>
      </div>
    </main>
  );
}
