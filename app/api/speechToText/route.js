import OpenAI, {toFile} from 'openai';
import fs from 'fs';
import { NextResponse } from "next/server";
import fileType from 'file-type';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request) {
  const req = await request.json()
  const base64Audio = req.audio;
  const audioBuffer = Buffer.from(base64Audio, 'base64');

  // Check the file type
  const type = await fileType.fromBuffer(audioBuffer);
  if (!type || !['flac', 'm4a', 'mp3', 'mp4', 'mpeg', 'mpga', 'oga', 'ogg', 'wav', 'webm'].includes(type.ext)) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
  }

  try {
    const text = await convertAudioToText(audioBuffer, type.ext);
    return NextResponse.json({ result: text }, { status: 200 });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return NextResponse.json({ error: error.response.data }, { status: 500 });
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return NextResponse.json({ error: "An error occurred during your request." }, { status: 500 });
    }
  }
}

async function convertAudioToText(audioData, ext) {
  const inputPath = `/tmp/input.${ext}`;
  fs.writeFileSync(inputPath, audioData);
  const file = await toFile(fs.createReadStream(inputPath));
  const response = await openai.audio.transcriptions.create({
    file: fs.createReadStream(inputPath),
    model: "whisper-1",
  });
  fs.unlinkSync(inputPath);
  const transcribedText = response.text;
  return transcribedText;
}
