"use client"

import { useState, useEffect } from 'react';

export default function Home() {

  const [recording, setRecording] = useState(false);
  
  function toggleRecording(){
    setRecording(!recording);
  }

  return (
    <main className="flex h-screen flex-col items-center bg-gradient-to-t from-rose-600 via-red-500 to-red-600 text-white">
      <div className="flex flex-col items-center justify-center space-y-12 mt-[240px]">
        <button className={`h-[160px] w-[160px] rounded-full shadow-2xl bg-white ${recording ? '' : 'agent-circle'}`}
          onClick={toggleRecording}>
        </button>
        {recording && (
          <div className="flex justify-center items-center space-x-4">
            <p className="text-4xl text-white font-bold">Listening...</p>
            {/* <div className="loading-dots">
              <div></div>
              <div></div>
              <div></div>
            </div> */}
          </div>
        )}
      </div>
    </main>
  );
}