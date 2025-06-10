from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 📦 Import all route modules
from routes import chat, reminder, timetable, voice, ocr
from scheduler.notifier import start_scheduler  # ⏰ Daily reminder checker

app = FastAPI(
    title="UniBuddy Backend",
    description="A smart assistant for students to manage chats, reminders, schedules, voice input, and image-based question answering",
    version="1.0.0"
)

# 🚪 Allow frontend access (React at localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔗 Register all API routes
app.include_router(chat.router)
app.include_router(reminder.router)
app.include_router(timetable.router)
app.include_router(voice.router)   # 🎙️ Voice input (WebSpeech + Whisper)
app.include_router(ocr.router)     # 📷 OCR image upload + answer generation

# ⏰ Background tasks (e.g., reminder checker)
start_scheduler()

# ✅ Health check route
@app.get("/")
def root():
    return {"message": "🎓 UniBuddy backend is running"}
