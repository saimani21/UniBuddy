from fastapi import APIRouter
from datetime import datetime
from database import reminder_collection
from models.reminder_model import Reminder
from bson.json_util import dumps

router = APIRouter()

@router.get("/api/reminders/")
def get_all_reminders():
    reminders = list(reminder_collection.find({}, {"_id": 0}))
    return {"reminders": reminders}

@router.get("/api/reminders/{user}")
def get_user_reminders(user: str):
    reminders = list(reminder_collection.find({"user": user}, {"_id": 0}))
    return {"reminders": reminders}

@router.get("/api/reminders/today/{user}")
def get_todays_reminders(user: str):
    today = datetime.now().date()
    reminders = list(reminder_collection.find({
        "user": user,
        "datetime": {
            "$gte": datetime(today.year, today.month, today.day),
            "$lt": datetime(today.year, today.month, today.day, 23, 59, 59)
        }
    }, {"_id": 0}))
    return {"reminders": reminders}
