from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
from openai import OpenAI
from dotenv import load_dotenv
import os

from utils.extractor import extract_reminder
from database import reminder_collection, chat_history_collection

from transformers import pipeline

load_dotenv()
router = APIRouter()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Emotion classifier pipeline
emotion_pipeline = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", return_all_scores=False)

class ChatRequest(BaseModel):
    message: str
    user: str = "mani"  # default user


@router.post("/api/chat/")
async def chat(req: ChatRequest):
    user_message = req.message
    user_name = req.user

    # 1. Detect emotion from user message
    emotion_result = emotion_pipeline(user_message)
    emotion = emotion_result[0]['label'] if emotion_result else "neutral"

    # 2. Call GPT-4o-mini with emotion context
    messages = [
        {
            "role": "system",
            "content": "You're UniBuddy, a friendly and empathetic assistant that helps mani stay organized. Adjust your tone based on the user's emotional state."
        },
        {
            "role": "user",
            "content": f"(Emotion: {emotion}) {user_message}"
        }
    ]
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages
    )
    reply = response.choices[0].message.content

    # 3. Try to extract a reminder from the message
    task, when = extract_reminder(user_message)
    if task and when:
        reminder_collection.insert_one({
            "user": user_name,
            "text": task,
            "datetime": when,
            "created_at": datetime.utcnow()
        })
        reply += f"\n📝 Got it! I’ve saved your reminder: '{task}' at {when.strftime('%I:%M %p')}."

    # 4. Save message, emotion, and reply to MongoDB
    chat_history_collection.insert_one({
        "user": user_name,
        "message": user_message,
        "emotion": emotion,
        "reply": reply,
        "timestamp": datetime.utcnow()
    })

    return {"reply": reply, "emotion": emotion}


# ✅ GET: Retrieve past messages with emotion
@router.get("/api/chat/history/{user}")
def get_chat_history(user: str):
    messages = list(chat_history_collection.find({"user": user}))
    formatted = []
    for msg in messages:
        formatted.append({
            "role": "user",
            "content": msg["message"],
            "emotion": msg.get("emotion")
        })
        if "reply" in msg:
            formatted.append({
                "role": "assistant",
                "content": msg["reply"]
            })
    return {"history": formatted}
