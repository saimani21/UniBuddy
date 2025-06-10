# 🎓 UniBuddy – Your Smart Student Assistant

[![FastAPI](https://img.shields.io/badge/backend-FastAPI-009688)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/frontend-React-61DAFB)](https://reactjs.org/)
[![OpenAI](https://img.shields.io/badge/powered%20by-GPT--4o--mini-ffcc00)](https://platform.openai.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> AI-powered assistant to manage schedules, reminders, conversations, emotions, and exam answers — built for students, by students.

---

## ✨ Features

| Feature                       | Description                                                            |
| ----------------------------- | ---------------------------------------------------------------------- |
| 💬 **Chat with GPT-4o-mini**  | Real-time conversation using OpenAI's GPT-4o-mini with memory support  |
| ⏰ **Reminders**               | Auto-detects tasks from text and stores reminders in MongoDB           |
| 🧠 **Emotion Detection**      | Analyzes sentiment of messages and shows emotion emoji                 |
| 🗣️ **English Voice Input**   | Web Speech API for real-time speech-to-text in English                 |
| 🌍 **Multilingual Input**     | Records speech and transcribes with Whisper API in any language        |
| 📘 **Class Schedule Support** | Handles queries like “What’s my next class?” from static schedule data |
| 🖼️ **OCR-based Answer Bot**  | Upload image of question paper, extract with Tesseract, answer via GPT |
| 📦 **MongoDB Storage**        | Persistent memory for chat, reminders, schedules                       |
| 🎨 **Responsive UI**          | Dark-themed, modern interface with sidebar navigation                  |

---

## 📸 Demo Screenshots

>![image](https://github.com/user-attachments/assets/10eacca9-0da0-44c5-aeca-4dccb16e67c3)
![image](https://github.com/user-attachments/assets/b5511889-0cc6-4234-b12d-26d98b028cf6)
![image](https://github.com/user-attachments/assets/944efc24-d996-4112-a5ea-3c8cc0ef09f7)




<img src="screenshots/chat.png" width="600" />
<img src="screenshots/reminder.png" width="600" />
<img src="screenshots/ocr-answer.png" width="600" />

---

## 🧹 Project Structure

```
unibuddy/
├── client/                   # React Frontend
│   ├── components/           # Modular UI components
│   └── lib/                  # API handlers
├── server/                   # FastAPI Backend
│   ├── routes/               # Chat, reminders, voice, OCR routes
│   ├── scheduler/            # Daily background reminder checker
│   ├── utils/                # Emotion detection, OCR, reminder extraction
│   ├── database.py           # MongoDB connection
│   └── main.py               # Entry point for FastAPI app
```

---

## ⚙️ Setup Instructions

### 🐍 Backend (FastAPI)

```bash
cd server
python -m venv venv
.\venv\Scripts\activate      # Windows
# or
source venv/bin/activate    # macOS/Linux

pip install -r requirements.txt

# Create .env file
echo "OPENAI_API_KEY=your_key_here" > .env

uvicorn main:app --reload
```

---

### ⚛️ Frontend (React + Vite)

```bash
cd client
npm install
npm run dev
```

---

### 📦 MongoDB Setup

* Option 1: Local MongoDB (default: `mongodb://localhost:27017`)
* Option 2: Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and update `server/database.py`

---

### 🌤️ Tesseract Setup (for OCR)

* Install [Tesseract OCR](https://github.com/tesseract-ocr/tesseract)
* Add the binary path to your environment or specify it in your Python code:

```python
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
```

---

## 🔌 API Overview

| Method | Endpoint                     | Description                    |
| ------ | ---------------------------- | ------------------------------ |
| POST   | `/api/chat/`                 | Chat with GPT + reminder logic |
| GET    | `/api/chat/history/{user}`   | Load chat history              |
| POST   | `/api/voice/transcribe/`     | Whisper API transcription      |
| POST   | `/api/ocr/upload/`           | OCR question → GPT answer      |
| POST   | `/api/reminder/create/`      | Add manual reminder            |
| GET    | `/api/reminder/all/{user}`   | Get all reminders              |
| GET    | `/api/timetable/next/{user}` | Get next class                 |

---

## 🚀 Deployment

* You can deploy the backend using:

  * [Render](https://render.com/)
  * [Railway](https://railway.app/)
  * [Fly.io](https://fly.io/)
* Frontend can be deployed on:

  * [Vercel](https://vercel.com/)
  * [Netlify](https://netlify.com/)

---

## 👩‍💼 Author

**Sai Mani**

> B.Tech CSE Student | AI Developer | NLP & Automation Enthusiast

---



---

## 🧠 Inspiration

Built to help students manage their academic tasks smartly using voice, vision, and chat — combining LLMs, speech, and OCR under one roof.
