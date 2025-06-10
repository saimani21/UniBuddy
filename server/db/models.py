from pydantic import BaseModel
from datetime import datetime

class ChatRequest(BaseModel):
    message: str

class ChatHistory(BaseModel):
    user: str
    message: str
    reply: str
    timestamp: datetime

class Task(BaseModel):
    user: str
    task: str
    time: str
