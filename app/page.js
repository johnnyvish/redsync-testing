"use client"

import { useState, useEffect } from 'react';

export default function Home() {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [transcription, setTranscription] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [gptResponse, setGPTResponse] = useState("Hello");

  useEffect(() => {
    async function setupRecorder() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = event => {
          setAudioChunks(currentChunks => [...currentChunks, event.data]);
        };
        setMediaRecorder(recorder);
      } catch (error) {
        console.error('Error accessing microphone', error);
      }
    }
    setupRecorder();
  }, []);

  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setAudioChunks([]);
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  useEffect(() => {
    if (!recording && audioChunks.length) {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      speechToText(audioBlob);
    }
  }, [recording, audioChunks]);

  useEffect(() => {
    if (transcription) {
      promptGPT(transcription);
    }
  }, [transcription]);

  async function speechToText(audioBlob) {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async function () {
        const base64Audio = reader.result.split(',')[1];
        const response = await fetch('/api/speechToText', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ audio: base64Audio }),
        });
        const data = await response.json();
        if (response.status !== 200) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        setTranscription(data.result);
      }
    } catch (error) {
      console.error('Error transcribing audio', error);
    }
  };

  async function textToSpeech(text) {
    try {
      const response = await fetch('/api/textToSpeech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text }),
      });
      if (response.status === 200) {
        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        setAudioUrl(audioUrl);
        playAudio(audioUrl);
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error converting text to speech', error);
    }
  }  

  async function promptGPT(text) {
    try {
      const response = await fetch('/api/gpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text }),
      });
      
      if (response.status === 200) {
        const data = await response.json();
        setGPTResponse(data.result)
        textToSpeech(data.result);
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error processing text through gpt', error);
    }
  }

  function playAudio(url) {
    const audio = new Audio(url);
    audio.play();
  }

  return (
    <main className="flex h-screen flex-col items-center bg-gradient-to-t from-rose-600 via-red-500 to-red-600 text-white">
      <div className="flex flex-col items-center justify-center space-y-12 mt-[240px]">
        <button
          className={`agent-circle h-[160px] w-[160px] rounded-full shadow-2xl ${recording ? 'bg-white/40' : 'bg-white'}`}
          onClick={recording ? stopRecording : startRecording}
        >
        </button>
        {/* <h2 className="text-xl sm:text-2xl md:text-4xl font-bold">{gptResponse}</h2> */}
      </div>
    </main>
  );
}
