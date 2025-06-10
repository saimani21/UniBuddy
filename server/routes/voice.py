from fastapi import APIRouter, UploadFile, File
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
router = APIRouter()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@router.post("/api/voice-transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    try:
        # ✅ Debug info
        print("📁 Received audio file:", file.filename, file.content_type)

        # ✅ Read audio bytes
        audio_bytes = await file.read()

        # ✅ Call OpenAI Whisper
        transcript = client.audio.transcriptions.create(
            model="whisper-1",
            file=(file.filename, audio_bytes, file.content_type),
            response_format="text"
        )

        print("📝 Transcript result:", transcript)
        return {"transcript": transcript}

    except Exception as e:
        print("❌ Whisper transcription error:", str(e))
        return {"error": str(e)}
