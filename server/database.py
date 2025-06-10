from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# MongoDB connection URI (local by default)
MONGO_URI = os.getenv("MONGO_URI", "mongodb://127.0.0.1:27017/")

# Create client and connect to database
client = MongoClient(MONGO_URI)
db = client["unibuddy"]

# ✅ Collections used in the app
chat_history_collection = db["chat_history"]
reminder_collection = db["reminders"]
