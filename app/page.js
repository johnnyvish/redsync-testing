"use client"

import { useState, useEffect } from 'react';

export default function Home() {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);

  useEffect(() => {
    async function setupRecorder() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = handleDataAvailable;
        setMediaRecorder(recorder);
      } catch (error) {
        console.error('Error accessing microphone', error);
      }
    }
    setupRecorder();
  }, []);

  const handleDataAvailable = (e) => {
    setAudioBlob(e.data);
  };

  useEffect(() => {
    if (audioBlob && !recording) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    }
  }, [audioBlob, recording]);

  function toggleRecording () {
    if (!mediaRecorder) return;
    if (recording) {
      mediaRecorder.stop();
    } else {
      mediaRecorder.start();
      setAudioBlob(null);
    }
    setRecording(!recording);
  };

  return (
    <main className="flex h-screen flex-col items-center bg-gradient-to-t from-rose-600 via-red-500 to-red-600 text-white">
      <div className="flex flex-col items-center justify-center space-y-12 mt-[240px]">
        <div 
          className={`agent-circle h-[160px] w-[160px] rounded-full shadow-2xl ${recording ? 'bg-white/40' : 'bg-white'}`} 
          onClick={toggleRecording}
        ></div>
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold">Hi</h2>
      </div>
    </main>
  );
}