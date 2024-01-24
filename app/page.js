"use client"

import { useEffect, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import Typewriter from 'typewriter-effect/dist/core';

export default function Home() {
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    setAudio(new Audio('intro.mp3'));
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

  const playAudioAndType = () => {
    if (audio) {
      audio.play();
    }
    const typewriter = new Typewriter('#typewriter', {
      loop: false,
      delay: 75,
    });

    typewriter
      .typeString("What's your name?")
      .start();
  };

  return (
    <main className="flex h-screen flex-col items-center bg-gradient-to-t from-rose-600 via-red-500 to-red-600">
      <div className="flex flex-col items-center justify-center space-y-12 mt-[240px]">
        <div className="agent-circle bg-white h-[160px] w-[160px] rounded-full" onClick={playAudioAndType}></div>
        <h2 id="typewriter" className="text-xl sm:text-2xl md:text-4xl font-bold"></h2>
      </div>
    </main>
  );
}
