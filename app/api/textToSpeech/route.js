import OpenAI from 'openai';
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request) {
  const req = await request.json();
  const text = req.text;

  try {
    const audioData = await convertTextToSpeech(text);
    return new NextResponse(audioData, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg'
      }
    });
    
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return new NextResponse(JSON.stringify({ error: error.response.data }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return new NextResponse(JSON.stringify({ error: "An error occurred during your request." }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }
}

async function convertTextToSpeech(text) {
  const response = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: text,
  });

  const audioData = await response.arrayBuffer();
  return Buffer.from(audioData);
}
